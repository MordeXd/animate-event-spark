from flask import Flask
from flask_cors import CORS
from routes.register import register_bp
from storage import init_csv

app = Flask(__name__)
CORS(app)

# Initialize CSV with headers if it doesn't exist
init_csv()

# Register blueprints
app.register_blueprint(register_bp)

@app.route('/')
def home():
    return "Event Registration API (CSV Storage) Running!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
