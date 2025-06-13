from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5173",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (username TEXT PRIMARY KEY, password TEXT)''')
    # 기본 사용자 추가
    try:
        c.execute("INSERT INTO users VALUES ('vpffp368', 'gusdn0501!')")
    except sqlite3.IntegrityError:
        pass  # 이미 존재하는 경우 무시
    conn.commit()
    conn.close()

@app.route('/')
def form_page():
    return render_template("form.html")

@app.route('/home')
def about():
    return "home!"

@app.route('/user/<username>')
def user_profile(username):
    return f'{username}의 프로필 페이지'

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
        
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = c.fetchone()
    conn.close()
    
    if user:
        response = jsonify({"message": "로그인 성공", "success": True})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    else:
        response = jsonify({"message": "아이디 또는 비밀번호가 올바르지 않습니다", "success": False})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 401

if __name__ == '__main__':
    init_db()
    print("Starting server on port 5001...")
    app.run(debug=True, port=5001, host='127.0.0.1')