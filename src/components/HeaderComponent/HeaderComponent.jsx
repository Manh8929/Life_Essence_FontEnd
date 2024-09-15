import { Badge, Col} from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './Style'
import { ShoppingCartOutlined,CaretDownOutlined,UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';


export const HeaderComponent = () => {
  return (
    <div>    
        <WrapperHeader >
            <Col span={5}>
            <WrapperTextHeader>LiFe Essence</WrapperTextHeader>
            </Col>
            <Col span={13} >    
            <ButtonInputSearch
                        placeholder="Search products" 
                        textButton="Search"
                        size="large"
            />
            </Col>
            <Col span={6} style={{display: 'flex', gap: '70px',alignItems: 'center'}} >
              <WrapperHeaderAccount>
              <UserOutlined style={{fontSize: '30px'}}/>
              <div>
                <WrapperTextHeaderSmall>Login/Register</WrapperTextHeaderSmall>
                <div>
                <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                <CaretDownOutlined />
                </div>
              </div>
              </WrapperHeaderAccount>
                <div style={{display: 'flex',gap: '5px'}}>
                  <Badge count = {4} size='small'>
                     <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}}/>
                  </Badge>
                     <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>   
                </div>
            </Col>  
        </WrapperHeader>
  </div>
  )
}
