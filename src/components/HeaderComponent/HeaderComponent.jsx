import { Badge, Button, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperLogoHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './Style'
import { ShoppingCartOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector , } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';
import logo from '../../assets/images/logo2.png';

const HeaderComponent = ({isHiddenSearch = false ,isHiddenCart= false}) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] =useState('')
  const [userAvatar, setUserAvatar] =useState('')
  const [search, setSearch] = useState('')
  const order = useSelector((state)=> state.order)
  const [loading, setLoading] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleLoGo = () => {
    navigate('/')
  }
  const handleLogout =async()=>{
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
  }

  useEffect(()=>{
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  },[user?.name, user?.avatar])
  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Infomation User</WrapperContentPopup>
      {user?.isAdmin &&(
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Management system</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('my-order') }>Order of me</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Logout</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type)=>{
    if(type === 'profile'){
      navigate('/profile-user')
    }else if(type ==='admin'){
      navigate('/system/admin')
    } else if (type === 'my-order'){
      navigate('/my-order',{ state:{

        id: user?.id,
        token: user?.access_token
      }
      })
    }else{
      handleLogout()
    }
    setIsOpenPopup(false)
  }
  const onSearch =(e)=>{
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div>
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset'}} >
        <Col span={5}>
          <WrapperLogoHeader src={logo} alt="Logo" onClick={handleLoGo}/>    
          {/* <WrapperTextHeader>LiFe Essence</WrapperTextHeader> */}
        </Col>
        {!isHiddenSearch &&(
        <Col span={13} >
          <ButtonInputSearch
            placeholder="Search products"
            textButton="Search"
            size="large"
            bordered = {false}
            onChange = {onSearch}
          />
        </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '70px', alignItems: 'center' }} >
        <Loading isPending={loading}>
          <WrapperHeaderAccount>
            {userAvatar?(
              <img src={userAvatar} style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
            }}alt='avatar'/>
            ):(
              <UserOutlined style={{ fontSize: '30px' }} />
            )}
            {user?.access_token ? (
              //xổ ra form
              <>
                <Popover content={content} trigger="click" open= {isOpenPopup}>
                    <div style={{ cursor: 'pointer', fontSize: "14px" }} onClick={() =>setIsOpenPopup((prev)=>!prev)}>{userName ?.length ? userName : user?.email}</div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                <WrapperTextHeaderSmall>Login/Register</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
        </Loading>
        {!isHiddenCart &&(
          <div onClick={()=> navigate('/order')} style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
            <Badge count={order?.orderItems?.length} size='small'>
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge>
            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
          </div>
        )}
        </Col>
      </WrapperHeader>
    </div>
  )
}
export default HeaderComponent