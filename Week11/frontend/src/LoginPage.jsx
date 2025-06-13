import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  Container,
  Title,
  Form,
  Input,
  Button,
  SignupButton,
  Message
} from './LoginPage.styled';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/reservation');
      }
    } catch (err) {
      setMessage('서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      <Container>
        <Title>로그인</Title>
        <Form>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" onClick={handleLogin}>로그인</Button>
          <SignupButton type="button" onClick={handleSignup}>회원가입</SignupButton>
        </Form>
        {message && <Message>{message}</Message>}
      </Container>
    </Wrapper>
  );
}

export default LoginPage; 