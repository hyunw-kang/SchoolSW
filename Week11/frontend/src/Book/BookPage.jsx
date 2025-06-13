import React, { useState } from 'react';
import { Wrapper, Container, Title, Info, Form, Label, Input, Button, Popup, PopupContent, PopupButton, PopupLabel } from './styled';
import { useNavigate, useLocation } from 'react-router-dom';

function BookPage() {
  const location = useLocation();
  const { table, date } = location.state || {};
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    card: '',
    people: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 예약 정보 서버로 전송
    const res = await fetch('http://localhost:5001/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        name: form.name,
        email: form.email,
        phone: form.phone,
        card: form.card,
        people: form.people,
        table_label: table?.label,
        date
      })
    });
    const data = await res.json();
    if (data.success) {
      setShowPopup(true);
    } else {
      alert(data.message || '예약에 실패했습니다.');
    }
  };

  const handleGoMain = () => {
    navigate('/reservation');
  };

  return (
    <Wrapper>
      <Container>
        <Title>예약하기</Title>
        <Info>
          <div>날짜: {date}</div>
          <div>테이블: {table?.label}</div>
        </Info>
        <Form onSubmit={handleSubmit}>
          <Label>이름</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />
          <Label>이메일</Label>
          <Input name="email" value={form.email} onChange={handleChange} required />
          <Label>전화번호</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} required />
          <Label>신용카드번호</Label>
          <Input name="card" value={form.card} onChange={handleChange} required />
          <Label>방문 인원수</Label>
          <Input name="people" type="number" min="1" value={form.people} onChange={handleChange} required />
          <Button type="submit">예약 완료</Button>
        </Form>
      </Container>
      {showPopup && (
        <Popup>
          <PopupContent>
            <h3 style={{ color: 'black' }}>예약이 성공적으로 완료되었습니다</h3>
            <PopupLabel>날짜: {date}</PopupLabel>
            <PopupLabel>이름: {form.name}</PopupLabel>
            <PopupLabel>이메일: {form.email}</PopupLabel>
            <PopupLabel>전화번호: {form.phone}</PopupLabel>
            <PopupLabel>신용카드번호: {form.card}</PopupLabel>
            <PopupLabel>방문 인원수: {form.people}</PopupLabel>
            <PopupLabel>테이블: {table?.label}</PopupLabel>
            <PopupButton onClick={handleGoMain}>메인으로</PopupButton>
          </PopupContent>
        </Popup>
      )}
    </Wrapper>
  );
}

export default BookPage; 