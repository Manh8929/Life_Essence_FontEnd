import React from 'react';
import { Label, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemsOrderInfo } from './Style';
import { useSelector } from 'react-redux';

import Loading from '../../components/LoadingComponent/Loading'
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../untils';



const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const { state } = location

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <Loading isPending={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Order Success</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Label>Phương thức Giao hàng</Label>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label>Phương thức thanh toán</Label>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemsOrderInfo>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '20px', color: '#4CAF50', fontWeight: 700 }}>
                    Đặt thành công !!!
                  </span>
                </div>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={order.image} style={{
                          width: '77px', 
                          height: '79px', 
                          objectFit: 'cover', 
                          borderRadius: '6px',
                          border: '1px solid #e0e0e0',
                          padding: '2px', }} />
                        <div style={{
                          width: '260px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span>
                          <span style={{ fontSize: '14px', color: '#242424' }}>Giá tiền : {convertPrice(order?.price)}</span>
                        </span>
                        <span style={{ marginLeft: 'auto' }}>
                          <span style={{ fontSize: '14px', color: '#242424' }}>Số lượng : {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemsOrderInfo>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>Tổng tiền : {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>

        </div>
      </Loading>
    </div>
  );
}

export default OrderSuccess;