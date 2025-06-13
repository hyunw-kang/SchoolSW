import React, { useState } from 'react';
import { Wrapper, Container, Title, Form, Label, Input, Button, Message } from './styled';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setTimeout(() => navigate('/login'), 1200);
      }
    } catch (err) {
      setMessage('서버 연결에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Label>이름</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />
          <Label>이메일</Label>
          <Input name="email" value={form.email} onChange={handleChange} required />
          <Label>전화번호</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} required />
          <Label>아이디</Label>
          <Input name="username" value={form.username} onChange={handleChange} required />
          <Label>비밀번호</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit">회원가입</Button>
        </Form>
        {message && <Message>{message}</Message>}
      </Container>
    </Wrapper>
  );
}

export default SignupPage; 