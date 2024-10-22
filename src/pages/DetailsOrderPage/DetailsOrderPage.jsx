import React, { useEffect } from 'react';
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading'
import { WrapperCalculationBox, WrapperContainer, WrapperContenInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemProduct, WrapperLable, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './Style';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { orderContant } from '../../contant';
import { convertPrice } from '../../untils';



const DetailsOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const params = useParams()
  const { id } = params


  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)

    return res.data
  }
  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder, enabled: Boolean(id) })

  const { isLoading, data } = queryOrder
  console.log('dataa', data)



  return (
    <div style={{ width: '100%', height: '100vh', background: '#f5f5fa' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h4>Chi tiet don hang</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLable>Địa chỉ người nhận</WrapperLable>
            <WrapperContenInfo>
              <div className='name-info'>{data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span>{`${data?.shippingAddress?.address},${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span>Điện thoại: </span>{data?.shippingAddress?.phone}</div>
            </WrapperContenInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLable>Hình thức giao hàng</WrapperLable>
            <WrapperContenInfo>
              <div className='delivery-info'><span className='name-delivery' >FAST </span> Giao hang tiet kiem</div>
              <div className='delivery-fee'><span>Phi Giao hang: </span>{convertPrice(data?.shippingPrice)}</div>
            </WrapperContenInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLable>Hinh thuc thanh toan</WrapperLable>
            <WrapperContenInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán ' : 'Chưa thanh toán'}</div>
            </WrapperContenInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperContainer>
          <WrapperStyleContent>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '610px' }}>San pham</div>
              <WrapperItemProduct>Gia</WrapperItemProduct>
              <WrapperItemProduct>So luong</WrapperItemProduct>
              <WrapperItemProduct>Giam gia</WrapperItemProduct>
            </div>
            {data?.orderItems?.map((order) => {
              const discountAmount = (order.price * order.discount) / 100;
              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img src={order?.image}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: ' 1px solid rgb(238, 238,238)',
                        padding: '2px'
                      }}
                    />
                    <div style={{
                      width: 260,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      height: '70px',
                      alignItems: 'center',
                      display: 'flex'
                    }}>
                      {order?.name}
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem>{order?.amount}</WrapperItem>
                  <WrapperItem>{order?.discount ? convertPrice(discountAmount) : '0 VND'}</WrapperItem>
                </WrapperProduct>
              )
            })}
          </WrapperStyleContent>
          <WrapperCalculationBox>
            <div><strong>Tạm tính:</strong> {convertPrice(data?.itemsPrice)}</div>
            <div><strong>Phí vận chuyển:</strong> {convertPrice(data?.shippingPrice)}</div>
            <div><strong>Tổng cộng:</strong> {convertPrice(data?.totalPrice + data?.shippingPrice)}</div>
          </WrapperCalculationBox>
        </WrapperContainer>
      </div>

    </div>
  );
}

export default DetailsOrderPage;