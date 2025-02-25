import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './Style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/Style';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../untils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/userMutationHooks';
import * as UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/StepComponent/StepComponent';


const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [listChecked, setListChecked] = useState([])
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''

  })
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited){
        dispatch(increaseAmount({ idProduct }))
      }
    } else {
      if(!limited){
        dispatch(decreaseAmount({ idProduct }))
      }
    }

  }
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }
  const handleOnchageCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

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

const  handleChangeAddress = ()=>{
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
    switch (true) {
      case priceMemo >= 500000:
      case order?.orderItemsSelected?.length === 0:
        return 0;
      case priceMemo >= 200000:
        return 10000;
      default:
        return 20000;
    }
  }, [priceMemo, order]);


  const totalPriceMemo = useMemo(() => {
    const discountedPrice = priceMemo - priceDiscountMemo; 
    return discountedPrice + deliveryPriceMemo; 
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }

  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true)
    }else{
      navigate('/payment')
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

  const { isLoading } = mutationUpdate

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

  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến Dưới 500.000 VND',
    },
    {
      title: '0 VND',
      description: 'Trên 500.000 VND',
    },
  ]

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <Step items={itemsDelivery} current={deliveryPriceMemo=== 10000 ? 2 : deliveryPriceMemo === 20000 ? 1 : order.orderItemsSelected.length===0 ? 0 :3}/>
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchageCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span>Tất cả ({order?.orderItems?.length} Sản phẩm)</span>
              </span>
              <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                        width: '260px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '14px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                        {/* <WrapperPriceDiscount>
                          2000
                        </WrapperPriceDiscount> */}
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 0)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size='small' min={1} max={order?.countInstock} />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount ===order?.countInstock)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }}  />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '14px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}

            </WrapperListOrder>

          </WrapperLeft>

          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                  <div>
                    <span>Address : </span>
                    <span style={{fontWeight: 'bold'}}>{`${user?.address} ${user?.city} `}</span>
                    <span onClick={handleChangeAddress} style={{color: 'blue', cursor: 'pointer'}}>Change</span>
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
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Mua hàng'}
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
    </div>
  );
}

export default OrderPage;