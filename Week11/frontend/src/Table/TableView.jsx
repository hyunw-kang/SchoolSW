import React, { useEffect, useState } from 'react';
import { TableBox2, TableBox4, TableBox6, TableBox8, TableLabel, Legend, LegendItem } from './styled';
import { useNavigate, useLocation } from 'react-router-dom';

const baseTables = [
  { id: 1, label: '2인석', position: '창가', location: 'window', style: { top: '15%', left: '18%' } },
  { id: 2, label: '2인석', position: '창가', location: 'window', style: { top: '15%', left: '32%' } },
  { id: 3, label: '2인석', position: '창가', location: 'window', style: { top: '15%', left: '46%' } },
  { id: 4, label: '2인석', position: '창가', location: 'window', style: { top: '15%', left: '60%' } },
  { id: 5, label: '4인석', position: '방', location: 'room', style: { top: '55%', left: '28%' } },
  { id: 6, label: '4인석', position: '방', location: 'room', style: { top: '55%', left: '41%' } },
  { id: 7, label: '6인석', position: '입구', location: 'entrance', style: { top: '70%', left: '10%' } },
  { id: 8, label: '8인석', position: '중앙', location: 'center', style: { top: '50%', left: '68%' } },
  { id: 9, label: '8인석', position: '중앙', location: 'center', style: { top: '50%', left: '86%' } },
  { id: 10, label: '2인석', position: '창가', location: 'window', style: { top: '85%', left: '70%' } },
  { id: 11, label: '2인석', position: '창가', location: 'window', style: { top: '85%', left: '78%' } },
  { id: 12, label: '2인석', position: '창가', location: 'window', style: { top: '85%', left: '86%' } },
  { id: 13, label: '2인석', position: '입구', location: 'entrance', style: { top: '85%', left: '40%' } },
];

function TableView() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.date;
  const [reservedLabels, setReservedLabels] = useState([]);
  const [time, setTime] = useState('lunch');

  useEffect(() => {
    if (selectedDate && time) {
      fetch(`http://localhost:5001/reserved-tables?date=${selectedDate}&time=${time}`)
        .then(res => res.json())
        .then(data => setReservedLabels(data.reserved || []));
    }
  }, [selectedDate, time]);

  const handleTableClick = (table, idx) => {
    const label = table.label + (table.label === '2인석' ? `_${idx}` : '');
    if (!reservedLabels.includes(label)) {
      navigate('/book', { state: { table, date: selectedDate, time, label } });
    }
  };

  const getTableBox = (table, reserved, onClick) => {
    if (table.label === '2인석') return <TableBox2 reserved={reserved ? 'true' : undefined} onClick={onClick}><TableLabel>{table.label}</TableLabel></TableBox2>;
    if (table.label === '4인석') return <TableBox4 reserved={reserved ? 'true' : undefined} onClick={onClick}><TableLabel>{table.label}</TableLabel></TableBox4>;
    if (table.label === '6인석') return <TableBox6 reserved={reserved ? 'true' : undefined} onClick={onClick}><TableLabel>{table.label}</TableLabel></TableBox6>;
    if (table.label === '8인석') return <TableBox8 reserved={reserved ? 'true' : undefined} onClick={onClick}><TableLabel>{table.label}</TableLabel></TableBox8>;
    return null;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', minHeight: '100vh', background: '#f8fafd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflowX: 'hidden' }}>
      <div style={{ position: 'relative', width: '80vw', maxWidth: 900, height: '70vh', minHeight: 500, background: '#f8fafd', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', margin: '0 auto' }}>
        <div style={{ fontWeight: 700, fontSize: 28, margin: '32px 0 0 48px' }}>
          Software Restaurant
        </div>
        <div style={{ position: 'absolute', top: 32, right: 48, display: 'flex', gap: 12 }}>
          <button
            style={{
              background: time === 'lunch' ? '#3575f6' : '#e0e0e0',
              color: time === 'lunch' ? 'white' : '#333',
              border: 'none',
              borderRadius: 16,
              padding: '8px 32px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
            }}
            onClick={() => setTime('lunch')}
          >
            점심
          </button>
          <button
            style={{
              background: time === 'dinner' ? '#3575f6' : '#e0e0e0',
              color: time === 'dinner' ? 'white' : '#333',
              border: 'none',
              borderRadius: 16,
              padding: '8px 32px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
            }}
            onClick={() => setTime('dinner')}
          >
            저녁
          </button>
        </div>
        <div style={{ fontWeight: 500, fontSize: 20, margin: '80px 0 0 48px' }}>
          Selected Date: {selectedDate} / {time === 'lunch' ? '점심' : '저녁'}
        </div>
        {/* 평면도 영역 */}
        <div style={{ position: 'relative', width: '90%', height: '60%', minHeight: 320, margin: '0 auto', background: '#fff', borderRadius: 12, border: '2px solid #222', marginTop: 32 }}>
          {/* 예시: 방, 창가, 입구, 중앙 등 표시 */}
          <div style={{ position: 'absolute', top: 10, left: 20, fontWeight: 600, color: '#aaa', fontSize: 18 }}>[창가]</div>
          <div style={{ position: 'absolute', top: 10, right: 30, fontWeight: 600, color: '#aaa', fontSize: 18 }}>[방]</div>
          <div style={{ position: 'absolute', bottom: 10, left: 20, fontWeight: 600, color: '#aaa', fontSize: 18 }}>[입구]</div>
          <div style={{ position: 'absolute', top: '50%', left: '93%', fontWeight: 600, color: '#aaa', fontSize: 18 }}>[중앙]</div>
          {/* 테이블 배치 */}
          {baseTables.map((table, idx) => {
            const label = table.label + (table.label === '2인석' ? `_${idx}` : '');
            const reserved = reservedLabels.includes(label);
            // 창가 2인석(아래쪽 3개)만 position을 창가로 표시
            const showPosition = (table.id === 10 || table.id === 11 || table.id === 12) ? '창가' : table.position;
            return (
              <div
                key={table.id}
                style={{ position: 'absolute', ...table.style, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translate(-50%, -50%)' }}
              >
                {getTableBox(table, reserved, () => handleTableClick(table, idx))}
                <div style={{ fontSize: 15, color: '#888' }}>{showPosition}</div>
              </div>
            );
          })}
        </div>
        <Legend>
          <LegendItem color="#3575f6">Reserved</LegendItem>
          <LegendItem color="#e0e0e0">Not Reserved</LegendItem>
        </Legend>
      </div>
    </div>
  );
}

export default TableView; 