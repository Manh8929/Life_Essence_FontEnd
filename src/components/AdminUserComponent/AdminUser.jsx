import React from 'react'
import { WrapperHeader } from './Style'
import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
  return (
    <div>
        <WrapperHeader>Quản lý Người dùng</WrapperHeader>
        <div style={{marginTop: '10px'}}>
        <Button style={{height: '120px', width: '120px', borderRadius: '6px', borderStyle: 'dashed'}}><PlusOutlined style={{fontSize: '50px'}}/></Button>
        </div>
        <div style={{marginTop: '20px'}}>
        <TableComponent/>
        </div>
    </div>
  )
}

export default AdminUser