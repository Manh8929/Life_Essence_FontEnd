import React, { useEffect } from 'react'
import { WrapperHeader, WrapperUploadFile } from './Style'
import { Button, Form, Modal } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../untils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/userMutationHooks'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
    })
    const mutation = useMutationHooks(
        (data) => {
            const { 
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock: countInStock} = data
          const res=  ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock
            })
            return res
        }
    )
    const { data, isPending, isSuccess, isError } = mutation

useEffect(()=>{
    if(isSuccess && data?.status==='OK'){
        message.success()
        handleCancel()
       
    }else if(isError){
        message.error()
    }
},[isSuccess, isError])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        })
    };
    const onFinish = () => {
       mutation.mutate(stateProduct)
       console.log('finish',stateProduct)
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    };
    const handleOnChangeImage = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })

    }
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '120px', width: '120px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '50px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent />
            </div>
            <Modal title="Create Product" open={isModalOpen} onCancel={handleCancel} okText=''>
                <Loading isPending={isPending}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name='name' />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnChange} name='type' />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name='price' />
                    </Form.Item>
                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your countInStock!' }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name='countInStock' />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnChange} name='rating' />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChange} name='description' />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your Image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                            <Button>Upload</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                    marginLeft: '15px'

                                }} alt='image' />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Loading>
            </Modal>
        </div>
    )
}

export default AdminProduct