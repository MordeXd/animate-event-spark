from flask import Flask
from flask_cors import CORS
from routes.register import register_bp

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Register blueprint
app.register_blueprint(register_bp)

@app.route('/')
def home():
    return "Event Registration API Running!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
