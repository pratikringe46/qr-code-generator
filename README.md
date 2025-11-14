🚀 QR Code Generator

A simple and modern full-stack web application that generates a downloadable QR code from any text or URL.

This project is built with a decoupled architecture, featuring a Python (Flask) backend API and a static HTML/CSS/JavaScript frontend.

[QR Code Generator](https://qr-code-generatorfree.netlify.app)
 <!-- 🛑 UPDATE THIS URL -->
<img width="1258" height="864" alt="image" src="https://github.com/user-attachments/assets/4e8cd082-abd8-4726-8833-a01a6bca447d" />

 <!-- 🛑 UPDATE THIS URL -->


🔑 Key Features

* Real-time Generation: Generates a QR code instantly from any text or URL.

* Download Option: Lets users download the generated QR code as a high-quality .png file.

* Modern UI: Clean, responsive, and mobile-friendly interface.

* Full-Stack Architecture: Demonstrates a decoupled frontend and backend.

🛠️ Tech Stack

* Frontend (Client-side)

  * HTML5

  * CSS3 (Modern styling, Flexbox, and animations)

  * JavaScript (ES6+) (Handling all logic, API calls with fetch)

* Backend (Server-side)

  * Python 3

  * Flask (To create the web server and API endpoint)

  * qrcode[pil] (The core Python library for generating QR codes)

  * Flask-CORS (To allow the frontend and backend to communicate)

  * Gunicorn (As the production-ready web server)

🏗️ Deployment Architecture

This project is deployed as a decoupled application, which is a modern, scalable, and professional way to build web apps.

* Frontend (Static Site): The frontend folder is deployed on Netlify.

  * It's globally distributed on a CDN for fast loading.

  * Netlify is configured to watch the main branch and auto-deploy any changes pushed to the frontend directory.
 
* Backend (Web Service): The backend folder is deployed as a Web Service on Render.

  * It runs as a Python server using Gunicorn.

  * It exposes a single API endpoint (/generate) that receives JSON data and returns JSON data.

The user flow is:

1. User visits the Netlify URL.

2. User clicks "Generate".

3. JavaScript on Netlify sends a fetch (POST) request to the Render URL (e.g., ...onrender.com/generate).

4. Flask server on Render receives the request, generates the QR code, and sends back the image as a Base64 JSON string.

5. JavaScript on Netlify receives the JSON, decodes it, and displays the image on the page.
