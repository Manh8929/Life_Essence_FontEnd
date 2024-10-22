import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export const WrapperHeaderUser = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;

export const WrapperInfoUser = styled.div`
 flex: 1;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  min-height: 100px;
  box-sizing: border-box;
`;

export const WrapperLable = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: uppercase;

  
`;

export const WrapperContenInfo = styled.div`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.5;
  .name-info{
    font-weight: 500;
    font-size: 16px;
  }
.address-info,
  .phone-info,
  .delivery-info,
  .delivery-fee,
  .payment-info {
   font-size: 14px; 
    margin-bottom: 5px; 
      font-weight: 400;
    color: #333; 
  }

  span {
    font-weight: 500; 
  }
  .name-delivery{
    color: #ea8500;
    font-weight: bold
  }
  .status-payment{
    color: red;
    font-weight: bold
    }
`;

export const WrapperStyleContent = styled.div`
  width: 970px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 100% ;
`;

export const WrapperItemProduct = styled.div`
  width: 150px;
  text-align: center;
  font-weight: bold;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 610px;
`;

export const WrapperItem = styled.div`
  width: 150px;
  text-align: center;
  color: #333;
`;
export const WrapperCalculationBox = styled.div`
  background: linear-gradient(135deg, #f9f9fb, #ffffff);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  min-width: 280px;
  height: 334.4px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid #e8e8e8;

  & > div {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #333;

    &:last-child {
      font-weight: bold;
      font-size: 18px;
      color: #ea8500;
      margin-top: 10px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
  }
`;