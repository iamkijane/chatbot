from flask import Flask, render_template
from routes.chat import chat_bp

app = Flask(__name__, static_folder='static', template_folder='templates')
app.register_blueprint(chat_bp, url_prefix='/api')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def home():
    return render_template('chat.html')

if __name__ == '__main__':
    app.run(debug=True)