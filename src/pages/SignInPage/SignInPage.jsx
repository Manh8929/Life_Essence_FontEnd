import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './Style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/logo-login.png'
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" />
          <div style={{ position: 'relative' }}>
            <span style={{ zIndex: '10', position: 'absolute', top: '4px', right: '8px' }}>
              {isShowPassword ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
          </div>
          <InputForm placeholder="password" type ={isShowPassword ? "text":"password"} />
          <ButtonComponent
            border={false}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={"Đăng Nhập"}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeigh: '700' }}>
          </ButtonComponent>
          <p> <WrapperTextLight>Quên mật khẩu ?</WrapperTextLight></p>
          <p>Chưa có tài khoản ? <WrapperTextLight>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={ImageLogo} preview={false} alt='image-logo' height="203px" width="203px" />
          <h4>Mua sắm tại Life Essense</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage