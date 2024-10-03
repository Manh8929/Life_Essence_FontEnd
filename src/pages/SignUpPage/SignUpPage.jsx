import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './Style'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/logo-login.png'
import React, { useEffect, useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'
import { useMutationHooks } from '../../hooks/userMutationHooks'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()


  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )
  const {data, isPending, isSuccess, isError} = mutation

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
  }


  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  };

  
  useEffect(()=>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }
  },[isSuccess,isError])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
          <div style={{ position: 'relative' }}>
            <span onClick={() => setIsShowPassword(!isShowPassword)} style={{ zIndex: '10', position: 'absolute', top: '4px', right: '8px' }}>
              {isShowPassword ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
          </div>
          <InputForm style={{ marginBottom: '10px' }} placeholder="password" type={isShowPassword ? "text" : "password"}
            value={password} onChange={handleOnChangePassword} />
          <div style={{ position: 'relative' }}>
            <span onClick={() => setIsShowConfirmPassword(!isConfirmShowPassword)} style={{ zIndex: '10', position: 'absolute', top: '4px', right: '8px' }}>
              {isConfirmShowPassword ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
            <InputForm placeholder="confirm password" type={isConfirmShowPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
          </div>
          {data?.status === 'ERR' && <span style={{color: "red"}}>{data?.message}</span>}
              <Loading isPending={isPending}>
          <ButtonComponent
            disabled={!email.length || !password.length ||!confirmPassword.length}
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={"Đăng Ký"}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeigh: '700' }}>
          </ButtonComponent>
              </Loading>
          <p>Bạn đã có tài khoản ? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={ImageLogo} preview={false} alt='image-logo' height="203px" width="203px" />
          <h4>Mua sắm tại Life Essense</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage