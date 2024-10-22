import { Form, Radio } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Label, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../untils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/userMutationHooks';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';


const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''

  })
  const [form] = Form.useForm();
  const dispatch = useDispatch()



  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])


  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])


  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      if (cur.discount > 0) {
        return total + ((cur.price * cur.discount / 100) * cur.amount);
      }
      return total;
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])


  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000
    } else if (priceMemo >= 500000 || order?.orderItemsSelected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  }, [order])

  // const deliveryPriceMemo = useMemo(() => {
  //   if (priceMemo >= 500000 ) {
  //     return 0;
  //   } else if (priceMemo >= 200000) {
  //     return 10000;
  //   } else {
  //     return 20000;
  //   }
  // }, [priceMemo, order]);


  const totalPriceMemo = useMemo(() => {
    const discountedPrice = priceMemo - priceDiscountMemo;
    return discountedPrice + deliveryPriceMemo;
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])

  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSelected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id
        }
      )
    }
  }
  const mutationUpdate = useMutationHooks(
    (data) => {
      const {
        id, token, ...rests } = data;
      const res = UserService.updateUser(
        id, { ...rests }, token
      )
      return res
    },
  )
  const mutationAddOrder = useMutationHooks(
    (data) => {
      const {
        token, ...rests } = data;
      const res = OrderService.createOrder(
        { ...rests }, token
      )
      return res
    },
  )

  const { isLoading, data } = mutationUpdate
  const { data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK'){
      const arrayOrdered = []
      order?.orderItemsSelected?.forEach(element => {
      arrayOrdered.push(element.product)
    });
    dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
    message.success('Đặt hàng thành công')
    navigate('/orderSuccess', {
      state: {
        delivery,
        payment,
        orders: order?.orderItemsSelected,
        totalPriceMemo: totalPriceMemo
      }
    })
  }else if (isError) {
    message.error()
  }
}, [isSuccess, isError])

const handleCancelUpdate = () => {
  setStateUserDetails({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,

  })
  form.resetFields()
  setIsOpenModalUpdateInfo(false)
}

const handleUpdateInfoUser = () => {
  const { name, phone, address, city } = stateUserDetails;
  if (name && phone && address && city) {
    mutationUpdate.mutate(
      { id: user?.id, token: user?.access_token, ...stateUserDetails },
      {
        onSuccess: () => {
          dispatch(updateUser({ name, phone, address, city }));
          setIsOpenModalUpdateInfo(false);
        },
        onError: (error) => {
          message.error('Failed to update user information');
          console.error('Update Error:', error);
        },
      }
    );
  }
};
const handleOnChangeDetails = (e) => {
  setStateUserDetails({
    ...stateUserDetails,
    [e.target.name]: e.target.value
  })
};

const handleDelivery = (e) => {
  setDelivery(e.target.value)
}

const handlePayment = (e) => {
  setPayment(e.target.value)
}


return (
  <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
    <Loading isPending={isLoadingAddOrder}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Payment</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức Giao hàng</Label>
                <WrapperRadio onChange={handleDelivery} value={delivery}>
                  <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST </span> Giao hàng tiết kiệm</Radio>
                  <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK </span> Giao hàng tiết kiệm</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Label>Chọn phương thức thanh toán</Label>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>

                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>

          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Address : </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city} `}</span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Change</span>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ width: '320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Thuế</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal style={{ width: '320px' }}>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>Đã bao gồm thuế</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Đặt hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
            />
          </WrapperRight>
        </div>

      </div>
      <ModalComponent title="Update user information" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
        {isLoading ? (
          <Loading isPending={isLoading} />
        ) : (
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails['name']} onChange={handleOnChangeDetails} name='name' />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent value={stateUserDetails['phone']} onChange={handleOnChangeDetails} name='phone' />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent value={stateUserDetails['address']} onChange={handleOnChangeDetails} name='address' />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent value={stateUserDetails['city']} onChange={handleOnChangeDetails} name='city' />
            </Form.Item>
          </Form>
        )}

      </ModalComponent>
    </Loading>
  </div>
);
}

export default PaymentPage;