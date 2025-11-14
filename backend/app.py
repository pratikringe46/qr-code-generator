import qrcode
import io
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)

# This is the crucial part:
# This will allow your frontend, hosted on a different domain (like netlify.app),
# to make requests to this backend.
CORS(app)

@app.route("/")
def home():
    # A simple route to test if the server is working
    return "Hello! This is the QR Code API backend."

@app.route("/generate", methods=["POST"])
def generate_qr():
    try:
        # Get the 'url' from the JSON data sent by the frontend
        data = request.get_json()
        url = data.get("url")

        if not url:
            return jsonify({"error": "No URL provided"}), 400

        # --- Your Python QR Code Logic ---
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        # ---------------------------------

        # Save the image to an in-memory buffer
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        
        # Get the byte value of the buffer and encode it as Base64
        # This is how we can send an image as text
        img_data = base64.b64encode(buffer.getvalue()).decode('utf-8')

        # Send the Base64 image string back to the frontend as JSON
        return jsonify({
            "message": "QR code generated successfully",
            "image_data": img_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# This is for local testing
if __name__ == "__main__":
    # You can run this file directly with `python app.py`
    app.run(debug=True, port=5000)