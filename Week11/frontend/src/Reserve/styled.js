import styled from 'styled-components';

// 공통 입력 폼 스타일
export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  font-size: 16px;
`;

// 공통 버튼 스타일
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background-color: #45a049;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background: #fff;
`;

export const TopBar = styled.div`
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #e0e0e0;
  padding: 0 40px;
  background: #fff;
  box-sizing: border-box;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: black;
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 28px;
`;

export const ProfilePopup = styled.div`
  position: absolute;
  top: 70px;
  right: 40px;
  width: 280px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  padding: 20px;
  z-index: 10;
`;

export const ReserveSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
`;

export const ReserveTitle = styled.h2`
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 40px;
  color: black;
`;

export const DateInput = styled.input`
  font-size: 20px;
  padding: 12px 20px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  width: 260px;
`;

export const ViewButton = styled.button`
  width: 200px;
  padding: 14px 0;
  background: ${props => props.disabled ? '#e0e0e0' : '#3575f6'};
  color: ${props => props.disabled ? '#888' : 'white'};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: 12px;
`;

export const Label = styled.div`
  color: black;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;

export const MyReservationsPopup = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const MyReservationsContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 36px 40px;
  min-width: 420px;
  text-align: center;
`;

export const ReservationItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 16px 0;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CancelButton = styled.button`
  margin-top: 8px;
  padding: 8px 0;
  width: 120px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;
