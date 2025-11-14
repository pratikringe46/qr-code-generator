document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://qr-code-generator-qpm1.onrender.com/generate"; // **IMPORTANT: REMEMBER TO UPDATE THIS FOR DEPLOYMENT**
    // const API_URL = "http://127.0.0.1:5000/generate";

    const generateBtn = document.getElementById("generate-btn");
    const urlInput = document.getElementById("url-input");
    const qrImage = document.getElementById("qr-image");
    const downloadBtn = document.getElementById("download-btn"); // **CHANGE:** Get download button element
    const errorMessage = document.getElementById("error-message");
    const loader = document.getElementById("loader"); // **CHANGE:** Get loader element

    async function generateQR() {
        const url = urlInput.value.trim();
        if (url === "") {
            showError("Please enter a URL or text.");
            hideQrAndDownload(); // **CHANGE:** Hide QR and download if input is empty
            return;
        }

        showLoading(true); // **CHANGE:** Show loading spinner
        clearError();
        hideQrAndDownload(); // **CHANGE:** Hide previous QR and download button

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "url": url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to generate QR code.");
            }

            const data = await response.json();
            const base64ImageData = "data:image/png;base64," + data.image_data;

            qrImage.src = base64ImageData;
            qrImage.style.display = "block"; // Show the QR image
            downloadBtn.classList.remove("hidden"); // **CHANGE:** Show the download button
            
            // **CHANGE:** Set the download link's href and filename
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = base64ImageData;
                a.download = `qrcode_${Date.now()}.png`; // Unique filename
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

        } catch (error) {
            showError(error.message);
            hideQrAndDownload(); // **CHANGE:** Ensure QR and download are hidden on error
        } finally {
            showLoading(false); // **CHANGE:** Hide loading spinner
        }
    }

    function showLoading(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            generateBtn.textContent = "Generating...";
            loader.style.display = "block"; // **CHANGE:** Show spinner
        } else {
            generateBtn.disabled = false;
            generateBtn.textContent = "Generate";
            loader.style.display = "none"; // **CHANGE:** Hide spinner
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        // Keep error message visible, but ensure QR and download are hidden
    }

    function clearError() {
        errorMessage.textContent = "";
    }

    function hideQrAndDownload() { // **CHANGE:** New function to hide related elements
        qrImage.style.display = "none";
        qrImage.src = ""; // Clear the image source
        downloadBtn.classList.add("hidden");
    }

    // Add click event listener to the button
    generateBtn.addEventListener("click", generateQR);

    // Optional: Allow pressing 'Enter' in the input field
    urlInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            generateQR();
        }
    });

    // Initially hide QR and download button
    hideQrAndDownload();
});























































































// document.addEventListener("DOMContentLoaded", () => {
//     // --- IMPORTANT ---
//     // This is the URL of your DEPLOYED backend API.
//     // For local testing, you can use: "http://127.0.0.1:5000/generate"
//     // After deploying, you will CHANGE this to your Render.com URL.
//     const API_URL = "http://127.0.0.1:5000/generate";
//     // -----------------

//     const generateBtn = document.getElementById("generate-btn");
//     const urlInput = document.getElementById("url-input");
//     const qrImage = document.getElementById("qr-image");
//     const errorMessage = document.getElementById("error-message");

//     async function generateQR() {
//         const url = urlInput.value.trim();
//         if (url === "") {
//             showError("Please enter a URL or text.");
//             return;
//         }

//         // Show loading state
//         showLoading(true);
//         clearError();

//         try {
//             // Use fetch() to send a POST request to your Flask API
//             const response = await fetch(API_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ "url": url }),
//             });

//             if (!response.ok) {
//                 // Handle errors from the API
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || "Something went wrong.");
//             }

//             const data = await response.json();

//             // We received the Base64 data!
//             // We must add "data:image/png;base64," to the front
//             // so the browser knows how to render it.
//             qrImage.src = "data:image/png;base64," + data.image_data;
            
//             // Show the image
//             qrImage.style.display = "block";

//         } catch (error) {
//             showError(error.message);
//         } finally {
//             // Hide loading state
//             showLoading(false);
//         }
//     }

//     function showLoading(isLoading) {
//         if (isLoading) {
//             generateBtn.disabled = true;
//             generateBtn.textContent = "Generating...";
//             qrImage.style.display = "none"; // Hide old image
//         } else {
//             generateBtn.disabled = false;
//             generateBtn.textContent = "Generate";
//         }
//     }

//     function showError(message) {
//         errorMessage.textContent = message;
//         qrImage.style.display = "none";
//     }

//     function clearError() {
//         errorMessage.textContent = "";
//     }

//     // Add click event listener to the button
//     generateBtn.addEventListener("click", generateQR);

//     // Optional: Allow pressing 'Enter' in the input field
//     urlInput.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//             generateQR();
//         }
//     });
// });

//  Part 4: Local Testing

// Before deploying, let's test it on your computer.

// 1.  **Start the Backend:**
//     * Open a terminal, `cd` into the `backend` folder.
//     * Make sure your venv is active.
//     * Run: `python app.py`
//     * It should say `Running on http://127.0.0.1:5000`. Leave this terminal running.

// 2.  **Start the Frontend:**
//     * **Do not** just open `index.html` in your browser. This will cause a `CORS` error.
//     * The easiest way to run the frontend locally is with the **"Live Server"** extension in VS Code.
//     * Right-click `frontend/index.html` and choose "Open with Live Server".
//     * This will open your site at a local URL like `http://127.0.0.1:5500`.

// 3.  **Test:** Your browser is open to `...:5500`. Your backend is running on `...:5000`. Type a URL in the box and click "Generate". The frontend will make an API call to the backend, get the image data, and display it.

// ---

// ### Part 5: Hosting the Website (Going Live!)

// This is the final step. We will deploy the `backend` and `frontend` to two different places.

// #### Step A: Put Your Code on GitHub

// 1.  Create a **new repository** on GitHub (e.g., `qr-code-project`).
// 2.  Push your *entire* project folder (with `backend` and `frontend`) to this repository.

// #### Step B: Host the Backend on Render

// 1.  Go to **Render.com** and sign up with your GitHub account.
// 2.  In the dashboard, click **New+** -> **Web Service**.
// 3.  Connect the GitHub repository you just created.
// 4.  You will see settings. This is the **most important part**:
//     * **Name:** `my-qr-api` (or anything you want)
//     * **Root Directory:** `backend` (This tells Render to *only* look inside your `backend` folder).
//     * **Environment:** `Python 3`
//     * **Region:** Choose one (e.g., Ohio)
//     * **Build Command:** `pip install -r requirements.txt` (It should find this automatically)
//     * **Start Command:** `gunicorn app:app` (This is the production server for Flask)
// 5.  Click **Create Web Service**. Render will start building.
// 6.  After a few minutes, it will be **LIVE**. You will get a URL like `https://my-qr-api.onrender.com`.
// 7.  **IMPORTANT:** Copy this URL!

// #### Step C: Host the Frontend on Netlify

// 1.  Go to **Netlify.com** and sign up with your GitHub account.
// 2.  In the dashboard, select **Add new site** -> **Import an existing project**.
// 3.  Connect to GitHub and select your `qr-code-project` repository.
// 4.  Netlify will ask for build settings:
//     * **Base directory:** `frontend` (Tells Netlify to *only* look inside your `frontend` folder).
//     * **Build command:** Leave this blank.
//     * **Publish directory:** Leave this blank (or `frontend`).
// 5.  Click **Deploy site**. Netlify will deploy in seconds.
// 6.  You will get a URL like `https://some-random-name.netlify.app`.

// #### Step D: The Final Connection

// You have one last thing to do.

// 1.  Your backend is at `https://my-qr-api.onrender.com`.
// 2.  Your frontend is at `https://some-random-name.netlify.app`.

// Your frontend code *doesn't know* where your backend is.

// 1.  Go back to your code on your computer.
// 2.  Open `frontend/script.js`.
// 3.  Change the `API_URL` variable:

//     ```javascript
//     // Change this:
//     // const API_URL = "http://127.0.0.1:5000/generate";
    
//     // To your new Render URL:
//     const API_URL = "https://my-qr-api.onrender.com/generate";