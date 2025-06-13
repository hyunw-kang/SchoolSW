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
        response = jsonify({"message": "로그인 성공", "success": True, "user": {
            "username": user[0], "name": user[2], "email": user[3], "phone": user[4]
        }})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    else:
        response = jsonify({"message": "아이디 또는 비밀번호가 올바르지 않습니다", "success": False})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 401

@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=?", (username,))
    if c.fetchone():
        conn.close()
        response = jsonify({"message": "이미 존재하는 아이디입니다.", "success": False})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 409
    c.execute("INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)",
              (username, password, name, email, phone))
    conn.commit()
    conn.close()
    response = jsonify({"message": "회원가입 성공", "success": True})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    return response

@app.route('/reserve', methods=['POST'])
def reserve():
    data = request.get_json()
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''INSERT INTO reservations (username, name, email, phone, card, people, table_label, date, time)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (data['username'], data['name'], data['email'], data['phone'], data['card'], data['people'], data['table_label'], data['date'], data['time']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': '예약이 저장되었습니다.'})

@app.route('/my-reservations', methods=['GET'])
def my_reservations():
    username = request.args.get('username')
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''SELECT id, date, time, table_label, name, email, phone, card, people FROM reservations WHERE username=? ORDER BY date, time''', (username,))
    rows = c.fetchall()
    conn.close()
    reservations = [
        {'id': row[0], 'date': row[1], 'time': row[2], 'table_label': row[3], 'name': row[4], 'email': row[5], 'phone': row[6], 'card': row[7], 'people': row[8]}
        for row in rows
    ]
    return jsonify({'success': True, 'reservations': reservations})

@app.route('/cancel-reservation', methods=['POST'])
def cancel_reservation():
    data = request.get_json()
    reservation_id = data['id']
    username = data['username']
    # 예약 날짜 확인
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT date FROM reservations WHERE id=? AND username=?', (reservation_id, username))
    row = c.fetchone()
    if not row:
        conn.close()
        return jsonify({'success': False, 'message': '예약을 찾을 수 없습니다.'}), 404
    from datetime import datetime, timedelta
    today = datetime.now().date()
    res_date = datetime.strptime(row[0], '%Y-%m-%d').date()
    if res_date <= today:
        conn.close()
        return jsonify({'success': False, 'message': '예약 당일에는 취소할 수 없습니다.'}), 400
    if (res_date - today).days < 1:
        conn.close()
        return jsonify({'success': False, 'message': '예약 하루 전까지만 취소할 수 있습니다.'}), 400
    c.execute('DELETE FROM reservations WHERE id=? AND username=?', (reservation_id, username))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': '예약이 취소되었습니다.'})

@app.route('/reserved-tables', methods=['GET'])
def reserved_tables():
    date = request.args.get('date')
    time = request.args.get('time')
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT table_label FROM reservations WHERE date=? AND time=?', (date, time))
    rows = c.fetchall()
    conn.close()
    reserved = [row[0] for row in rows]
    return jsonify({'reserved': reserved})

if __name__ == '__main__':
    init_db()
    print("Starting server on port 5001...")
    app.run(debug=True, port=5001, host='127.0.0.1')