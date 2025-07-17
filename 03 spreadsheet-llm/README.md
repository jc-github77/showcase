🧠 Spreadsheet-Powered LLM Interaction

This project provides a minimal setup for interacting with a Large Language Model (LLM) using spreadsheet data as contextual input.

🔧 Architecture Overview

- LLM Runtime: The LLM (LLaMA 3) is hosted in a Docker container for isolated and reproducible execution.

- Backend Server: A lightweight Node.js web server exposes an HTTP endpoint that accepts user prompts along with spreadsheet data. These inputs are forwarded to the LLM for processing.

- Frontend Interface: The UI is a single HTML file featuring:

- A text input field for entering prompts

- A display area for rendering the LLM's response


📦 Use Case

Ideal for scenarios where structured spreadsheet data needs to be leveraged as context for generating intelligent responses via an LLM.

Running:
- Start llama3 in docker: docker exec -it ollama ollama run llama3

- start server: in backend directory: node inde.js

- frontend: open index.html file in frontend directoy in a browser
