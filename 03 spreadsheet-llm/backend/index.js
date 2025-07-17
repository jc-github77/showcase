const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
/*const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();*/

const app = express();
app.use(cors());
app.use(express.json());

/*const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);*/


const axios = require('axios');


// Load spreadsheet
/*function loadSpreadsheetData() {
  const workbook = xlsx.readFile('spreadsheet.xlsx');
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
}*/


/*function loadSpreadsheetData() {
  const workbook = xlsx.readFile('spreadsheet.xlsx');

  const authorSheet = workbook.Sheets['author'];
  const seriesSheet = workbook.Sheets['series'];
  const ownershipSheet = workbook.Sheets['ownership'];
  const readStatusSheet = workbook.Sheets['readStatus'];
  const bookSheet = workbook.Sheets['book'];

  const authors = xlsx.utils.sheet_to_json(authorSheet);
  const series = xlsx.utils.sheet_to_json(seriesSheet);
  const ownership = xlsx.utils.sheet_to_json(ownershipSheet);
  const readStatus = xlsx.utils.sheet_to_json(readStatusSheet);
  const books = xlsx.utils.sheet_to_json(bookSheet);

  return { authors, series, ownership, readStatus, books };
}*/


function loadAllSpreadsheetData() {
  const workbook = xlsx.readFile('spreadsheet.xlsx');
  const data = {};

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    data[sheetName] = xlsx.utils.sheet_to_json(sheet);
  });

  return data;
}



/*app.post('/api/query', async (req, res) => {
  const { prompt } = req.body;
  const spreadsheetData = loadSpreadsheetData();

  const context = JSON.stringify(spreadsheetData, null, 2);
  const fullPrompt = `Given the following spreadsheet data:\n${context}\n\nAnswer the following question:\n${prompt}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: fullPrompt }],
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from LLM' });
  }
});*/



app.post('/api/query', async (req, res) => {
  const { prompt } = req.body;
  //const spreadsheetData = loadSpreadsheetData();
  //const { authors, series, ownership, readStatus, books } = loadSpreadsheetData();
  const spreadsheetData = loadAllSpreadsheetData();


  //const context = JSON.stringify(spreadsheetData, null, 2);
  //const context = JSON.stringify({ authors, series, ownership, readStatus, books }, null, 2);  
  const context = JSON.stringify(spreadsheetData, null, 2);

  
  const fullPrompt = `Given the following spreadsheet data:\n${context}\n\nAnswer the following question:\n${prompt}`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3', // or another model you've pulled
      prompt: fullPrompt,
      stream: false
    });

    res.json({ response: response.data.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from local LLM' });
  }
});




app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
