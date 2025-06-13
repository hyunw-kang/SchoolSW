import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  Container,
  TopBar,
  Title,
  ProfileButton,
  ProfilePopup,
  ReserveSection,
  ReserveTitle,
  DateInput,
  ViewButton,
  Label,
  MyReservationsPopup,
  MyReservationsContent,
  ReservationItem,
  CancelButton
} from './styled';
import { useNavigate } from 'react-router-dom';

function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelMsg, setCancelMsg] = useState('');
  const navigate = useNavigate();

  // Read user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('user')) || {
    id: '',
    name: '',
    email: '',
    phone: '',
    username: ''
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const fetchReservations = async () => {
    setLoading(true);
    setCancelMsg('');
    const res = await fetch(`http://localhost:5001/my-reservations?username=${userInfo.username}`);
    const data = await res.json();
    setReservations(data.reservations || []);
    setLoading(false);
  };

  const handleShowReservations = () => {
    fetchReservations();
    setShowReservations(true);
  };

  const handleCancel = async (id, date) => {
    setCancelMsg('');
    const res = await fetch('http://localhost:5001/cancel-reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, username: userInfo.username })
    });
    const data = await res.json();
    setCancelMsg(data.message);
    if (data.success) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  const isCancelable = (dateStr) => {
    const today = new Date();
    const resDate = new Date(dateStr);
    const diff = (resDate - today) / (1000 * 60 * 60 * 24);
    // 예약일이 오늘이거나 지났으면 불가, 하루 전까지만 가능
    return resDate > today && diff >= 1;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleViewTable = () => {
    if (selectedDate) {
      navigate('/table', { state: { date: selectedDate } });
    }
  };

  return (
    <Wrapper>
      <Container>
        <TopBar>
          <Title>Software Restaurant</Title>
          <ProfileButton onClick={() => setShowProfile(!showProfile)}>
            <span role="img" aria-label="user">👤</span>
          </ProfileButton>
          {showProfile && (
            <ProfilePopup>
              <Label style={{ fontWeight: 600, marginBottom: 8 }}>안녕하세요, [{userInfo.username}]님!</Label>
              <Label>이름: {userInfo.name}</Label>
              <Label>이메일: {userInfo.email}</Label>
              <Label style={{ marginBottom: 12 }}>전화번호: {userInfo.phone}</Label>
              <button 
                style={{ width: '100%', padding: '8px 0', background: '#f5f5f7', border: 'none', borderRadius: 6, color: '#333', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
              >
                로그아웃
              </button>
            </ProfilePopup>
          )}
        </TopBar>
        <ReserveSection>
          <ReserveTitle>Reserve Table</ReserveTitle>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <DateInput
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={today}
              max={maxDate}
              placeholder="날짜를 선택해주세요."
            />
          </div>
          <ViewButton
            disabled={!selectedDate}
            onClick={handleViewTable}
          >
            View Table
          </ViewButton>
          <ViewButton style={{ background: '#888', marginTop: 16 }} onClick={handleShowReservations}>
            내 예약 보기
          </ViewButton>
        </ReserveSection>
        {showReservations && (
          <MyReservationsPopup>
            <MyReservationsContent>
              <h3 style={{ color: 'black' }}>내 예약 목록</h3>
              {loading ? <div>불러오는 중...</div> : (
                reservations.length === 0 ? <div style={{ color: 'black' }}>예약 내역이 없습니다.</div> : (
                  reservations.map(r => (
                    <ReservationItem key={r.id}>
                      <div>날짜: {r.date}</div>
                      <div>테이블: {r.table_label}</div>
                      <div>이름: {r.name}</div>
                      <div>이메일: {r.email}</div>
                      <div>전화번호: {r.phone}</div>
                      <div>신용카드번호: {r.card}</div>
                      <div>방문 인원수: {r.people}</div>
                      <CancelButton
                        disabled={!isCancelable(r.date)}
                        onClick={() => handleCancel(r.id, r.date)}
                      >
                        예약 취소
                      </CancelButton>
                    </ReservationItem>
                  ))
                )
              )}
              {cancelMsg && <div style={{ color: 'red', marginTop: 10 }}>{cancelMsg}</div>}
              <ViewButton style={{ marginTop: 20 }} onClick={() => setShowReservations(false)}>닫기</ViewButton>
            </MyReservationsContent>
          </MyReservationsPopup>
        )}
      </Container>
    </Wrapper>
  );
}

export default ReservationPage;
