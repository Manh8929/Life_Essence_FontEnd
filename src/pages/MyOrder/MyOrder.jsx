import React, { useEffect } from 'react';
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading'
import { useQuery } from '@tanstack/react-query';
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from './Style';
import { convertPrice } from '../../untils';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate} from 'react-router-dom';
import { useMutationHooks } from '../../hooks/userMutationHooks';
import { message } from 'antd';


const MyOrder = () => {
  const location = useLocation()
  const {state} = location
  const navigate = useNavigate()
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token)

    return res.data
  }
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder, enabled: Boolean(state?.id && state?.token) })

  const { isLoading, data } = queryOrder
 
  const handleDetailsOrder = (id)=>{
    navigate(`/details-order/${id}`,{
      state: {
        token: state?.token
      }
    })}
    

    const mutation = useMutationHooks(
      (data) => {
        const {id,token, orderItems } = data
        const res = OrderService.cancelOrder(id,token, orderItems)
        return res
      },
    )
    const handleCancelOrder = (order)=>{
      mutation.mutate({id: order._id, token: state?.token, orderItems: order?.orderItems},{
        onSuccess: ()=>{
          queryOrder.refetch()
        },
      })
  }
  const {isLoading: isLoadingCancel,isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation

    useEffect(() => {
      if (isSuccessCancel && dataCancel?.status === 'OK') {
        message.success('Dơn hàng đã được huỷ')

      } else if (isErrorCancel) {
        message.error('Huỷ hàng không thành công')
      }
    }, [isSuccessCancel, isErrorCancel, dataCancel])
    
  const renderProduct = (data) => {
    return data?.map((order) => (
      <WrapperHeaderItem key={order?._id}>
        <img
          src={order?.image}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            padding: '2px',
          }}
        />
        <div style={{
          width: '260px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '12px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          {order?.name}
        </div>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
      </WrapperHeaderItem>
    ));
  };

  return (
    <Loading isPending={isLoading}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
            Đơn hàng của tôi
            </h4>
          <WrapperListOrder>
            {data?.map((order)=>{
              
                return(
                  <WrapperItemOrder key={order?._id}>
                    <WrapperStatus>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#444' }}>Trạng thái</span>
                      <div><span style={{ color: '#ff424e', fontWeight: 500}}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</div>
                      <div><span style={{ color: '#ff424e', fontWeight: 500 }}>Thanh toán: </span>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</div>
                    </WrapperStatus>
                      {renderProduct(order.orderItems)}
                    <WrapperFooterItem>
                      <div>
                        <span style={{ color: '#ff424e', fontWeight: '500' }}>Tổng tiền: </span>
                        <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{convertPrice(order?.totalPrice)} </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <ButtonComponent
                          onClick={() => handleCancelOrder(order)}
                          size={40}
                          styleButton={{
                            height: '36px',
                            border: '1px solid #00ccff',
                            borderRadius: '4px',
                            backgroundColor: '#f0f0f5',
                            fontWeight: '400',
                            color: '#00ccff'
                          }}
                          textButton={'Huỷ đơn hàng'}
                        />
                        <ButtonComponent
                          onClick={() => handleDetailsOrder(order?._id)}
                          size={40}
                          styleButton={{
                            height: '36px',
                            border: '1px solid #00ccff',
                            borderRadius: '4px',
                            backgroundColor: '#f0f0f5',
                            fontWeight: '400',
                            color: '#00ccff'
                          }}
                          textButton={'Xem chi tiết'}
                          
                        />
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                )
              })
            }
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
}

export default MyOrder;