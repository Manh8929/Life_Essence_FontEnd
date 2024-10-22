import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './Style'
import { Button, Form, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../../components/LoadingComponent/Loading'
import * as UserService from '../../services/UserService'
import * as message from '../../components/MessageComponent/Message'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../untils'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/userMutationHooks'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    isAdmin: false,
  })
  const [form] = Form.useForm();

  
  const mutationUpdate = useMutationHooks(
    (data) => {
      const {
        id, token, ...rests } = data
      const res = UserService.updateUser(
        id, { ...rests }, token
      )
      return res
    },
  )
  const mutationDelete = useMutationHooks(
    (data) => {
      const {
        id,
        token } = data
      const res = UserService.deleteUser(
        id,
        token
      )
      return res
    },
  )
  const mutationDeleteMany = useMutationHooks(
    (data) => {
      const {

        token,
        ...ids } = data
      const res = UserService.deleteManyUser(
        ids,
        token
      )
      return res
    },
  )
  const handleDeleteManyUsers = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    return res
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
        isAdmin: res?.data?.isAdmin,
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
      form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsUser = () => {
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
  const { data: dataDeletedMany, isPending: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany

  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUsers })
  const { isLoading: isLoadingUsers, data: users } = queryUser
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ fontSize: '25px', color: 'orange', cursor: 'pointer' }} onClick={handleDetailsUser} />
      </div>
    )

  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.isAdmin === value;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,

    },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id , isAdmin: user.isAdmin? 'TRUE': 'FALSE'}
  })

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany])


  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()

    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted, isErrorDeleted])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,

    })
    form.resetFields()
  };
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()

    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated, isErrorUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }


  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  };

  const handleOnChangeImageDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })

  }
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  return (
    <div>
      <WrapperHeader>User Management</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>
      <DrawerComponent title='Detail User' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='60%'>
        <Loading isPending={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
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
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name='email' />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name='phone' />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name='address' />
            </Form.Item>
            
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: 'Please input your avatar!' }]}
            >
              <WrapperUploadFile onChange={handleOnChangeImageDetails} maxCount={1}>
                <Button>Upload</Button>
                {stateUserDetails?.avatar && (
                  <img src={stateUserDetails?.avatar} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    marginLeft: '15px'

                  }} alt='avatar' />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent  title="Delete User" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <Loading isPending={isLoadingDeleted}>
          <div>Are you sure to delete user</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser