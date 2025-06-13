from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (username TEXT PRIMARY KEY, password TEXT, name TEXT, email TEXT, phone TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        card TEXT,
        people INTEGER,
        table_label TEXT,
        date TEXT,
        time TEXT
    )''')
    # 기본 사용자 추가
    try:
        c.execute("INSERT INTO users VALUES ('vpffp368', 'gusdn0501!', '강현우', '2020112174@dgu.ac.kr', '010-7794-2701')")
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
        response = jsonify({
            "message": "로그인 성공",
            "success": True,
            "user": {
                "username": user[0],
                "name": user[2],
                "email": user[3],
                "phone": user[4]
            }
        })
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    else:
        response = jsonify({"message": "아이디 또는 비밀번호가 올바르지 않습니다", "success": False})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 401

@app.route('/reserve', methods=['POST', 'OPTIONS'])
def reserve():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': '데이터가 없습니다.'}), 400

        required_fields = ['username', 'name', 'email', 'phone', 'card', 'people', 'table_label', 'date', 'time']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'message': f'필수 필드가 누락되었습니다: {field}'}), 400

        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute('''INSERT INTO reservations (username, name, email, phone, card, people, table_label, date, time)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (data['username'], data['name'], data['email'], data['phone'], data['card'], 
                   data['people'], data['table_label'], data['date'], data['time']))
        conn.commit()
        conn.close()
        
        response = jsonify({'success': True, 'message': '예약이 저장되었습니다.'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    except Exception as e:
        print(f"Error in reserve: {str(e)}")  # 서버 로그에 오류 출력
        response = jsonify({'success': False, 'message': f'예약 저장 중 오류가 발생했습니다: {str(e)}'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 500

@app.route('/reserved-tables', methods=['GET'])
def get_reserved_tables():
    date = request.args.get('date')
    time = request.args.get('time')
    
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''SELECT table_label FROM reservations WHERE date=? AND time=?''', (date, time))
    reserved = [row[0] for row in c.fetchall()]
    conn.close()
    
    response = jsonify({'reserved': reserved})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response

@app.route('/my-reservations', methods=['GET'])
def my_reservations():
    username = request.args.get('username')
    
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''SELECT id, date, time, table_label, name, email, phone, card, people 
                 FROM reservations WHERE username=? ORDER BY date, time''', (username,))
    rows = c.fetchall()
    conn.close()
    
    reservations = [
        {
            'id': row[0],
            'date': row[1],
            'time': row[2],
            'table_label': row[3],
            'name': row[4],
            'email': row[5],
            'phone': row[6],
            'card': row[7],
            'people': row[8]
        }
        for row in rows
    ]
    
    response = jsonify({'success': True, 'reservations': reservations})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response

if __name__ == '__main__':
    init_db()
    print("Starting server on port 5001...")
    app.run(debug=True, port=5001, host='127.0.0.1')