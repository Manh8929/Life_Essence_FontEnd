import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './Style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/logo-login.png'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/userMutationHooks'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      if(location?.state){
        navigate(location?.state)
      }else{  
      navigate('/')
      }
      if (data?.access_token) {
        localStorage.setItem('access_token',JSON.stringify(data?.access_token))
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    } else if (isError) {
      message.error()
    }
  }, [isSuccess,isError, data, navigate, message])


  const handleGetDetailsUser = async (id, token) => {

    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }



  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail} />
          <div style={{ position: 'relative' }}>
            <span onClick={() => setIsShowPassword(!isShowPassword)} style={{ zIndex: '10', position: 'absolute', top: '4px', right: '8px' }}>
              {isShowPassword ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword} />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
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
          </Loading>
          <p> <WrapperTextLight>Quên mật khẩu ?</WrapperTextLight></p>
          <p>Chưa có tài khoản ? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
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