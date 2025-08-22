from flask import Flask
from flask_cors import CORS
from routes.register import register_bp
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Register blueprint
app.register_blueprint(register_bp)

@app.route('/')
def home():
    return "Event Registration API Running!"

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
