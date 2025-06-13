import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 48px 40px;
  min-width: 400px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: black;
`;

export const Info = styled.div`
  color: black;
  font-size: 18px;
  margin-bottom: 32px;
  > div { margin-bottom: 6px; }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const Button = styled.button`
  margin-top: 18px;
  padding: 12px 0;
  background: #3575f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const Popup = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 36px 40px;
  min-width: 320px;
  text-align: center;
`;

export const PopupButton = styled.button`
  margin-top: 24px;
  padding: 12px 0;
  width: 100%;
  background: #3575f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const PopupLabel = styled.div`
  color: black;
  font-size: 17px;
  margin-bottom: 6px;
`; 