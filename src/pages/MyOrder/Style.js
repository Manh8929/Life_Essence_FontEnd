import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
  padding: 10px;
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #e0e0e5;
  width: 100%;
  align-items: flex-end;
  padding: 10px 0;
`;

export const WrapperStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(235, 235, 240);
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e0e0e5;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 10px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;