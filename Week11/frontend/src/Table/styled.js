import styled from 'styled-components';

export const TableLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 60px 0 30px 0;
`;

export const TableBox2 = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.reserved ? '#3575f6' : '#e0e0e0'};
  color: ${props => props.reserved ? 'white' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

export const TableBox4 = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.reserved ? '#3575f6' : '#e0e0e0'};
  color: ${props => props.reserved ? 'white' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

export const TableBox6 = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.reserved ? '#3575f6' : '#e0e0e0'};
  color: ${props => props.reserved ? 'white' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

export const TableBox8 = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.reserved ? '#3575f6' : '#e0e0e0'};
  color: ${props => props.reserved ? 'white' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 19px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

export const TableLabel = styled.div`
  text-align: center;
  font-size: 15px;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.color};
`; 