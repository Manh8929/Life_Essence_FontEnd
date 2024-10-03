import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../untils';
import { ProductOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUserComponent/AdminUser';
import AdminProduct from '../../components/AdminProductComponent/AdminProduct';

const AdminPage = () => {

  const items = [
    getItem('User Management', 'user', <UserOutlined />,),
    getItem('Manager Management', 'manager', <SolutionOutlined />),
    getItem('Product Management', 'product', <ProductOutlined />),
  ];
  const rootSubmenuKeys = ['user', 'manager', 'product'];
  const [openKeys, setOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('')
  const renderPage = (key)=>{
    switch(key){
      case 'user':
        return(
          <AdminUser/>
        )
      case 'product':
        return(
          <AdminProduct/>
        )
        default:
          return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart/>
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
}

export default AdminPage