import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperTotal } from './Style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/Style';

const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
  };
  const handleChangeCount = () => {

  }
  const handleOnchageCheckAll = (e) => {

  }
  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchageCheckAll}></Checkbox>
                <span>Tất cả ({count} Sản phẩm)</span>
              </span>
              <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div style={{ width: '390px', display: 'flex', alignItems: 'center' }}>
                  <Checkbox onChange={onChange}></Checkbox>
                  <img src="imag" style={{ width: '77px', height: '79px', objectFit: 'cover' }} alt="" />
                  <div>Tên sản phẩm</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <span style={{ fontSize: '14px', color: '#242424' }}>211</span>
                    <WrapperPriceDiscount>
                      233
                    </WrapperPriceDiscount>
                  </span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent' }}>
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber onChange={onChange} defaultValue={1} />
                    <button style={{ border: 'none', background: 'transparent' }}>
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                  </WrapperCountOrder>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '14px', fontWeight: 'bold' }}>1212</span>
                  <DeleteOutlined style={{ cursor: 'pointer' }} />
                </div>

              </WrapperItemOrder>

            </WrapperListOrder>

          </WrapperLeft>

          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo style={{ width: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>1,000,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>100,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Thuế</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>50,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>20,000 VND</span>
                </div>
              </WrapperInfo>
              <WrapperTotal style={{ width: '300px' }}>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>970,000 VND</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>Đã bao gồm thuế</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
            />
          </WrapperRight>
        </div>

      </div>
    </div>
  );
}

export default OrderPage;