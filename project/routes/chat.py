from flask import Blueprint, request, jsonify
from services.gpt_service import ask_gpt

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"reply": "메시지를 입력해주세요."}), 400

    reply = ask_gpt(message)
    return jsonify({"reply": reply})