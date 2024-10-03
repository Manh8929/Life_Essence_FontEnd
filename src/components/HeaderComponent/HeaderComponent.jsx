import { Badge, Button, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './Style'
import { ShoppingCartOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector , } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = ({isHiddenSearch = false ,isHiddenCart= false}) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] =useState('')
  const [userAvatar, setUserAvatar] =useState('')
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
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
      <WrapperContentPopup onClick={handleLogout}>Logout</WrapperContentPopup>
      <WrapperContentPopup onClick={()=>navigate('/profile-user')}>Infomation User</WrapperContentPopup>
      {user?.isAdmin &&(
        <WrapperContentPopup onClick={()=>navigate('/system/admin')}>Management system</WrapperContentPopup>
      )}
    </div>
  );
  return (
    <div>
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset'}} >
        <Col span={5}>
          <WrapperTextHeader>LiFe Essence</WrapperTextHeader>
        </Col>
        {!isHiddenSearch &&(
        <Col span={13} >
          <ButtonInputSearch
            placeholder="Search products"
            textButton="Search"
            size="large"
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
                objectFit: 'cover'

            }}alt='avatar'/>
            ):(
              <UserOutlined style={{ fontSize: '30px' }} />
            )}
            {user?.access_token ? (
              //xổ ra form
              <>
                <Popover content={content} trigger="click">
                <div style={{ cursor: 'pointer', fontSize: "14px" }}>{userName ?.length ? userName : user?.email}</div>
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
          <div style={{ display: 'flex', gap: '5px' }}>
            <Badge count={4} size='small'>
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