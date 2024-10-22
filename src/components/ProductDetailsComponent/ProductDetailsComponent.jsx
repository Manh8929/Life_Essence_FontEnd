import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProductSmall from '../../assets/images/blackmores-glucosamine-sulfate-1500-one-a-day-1-anhLon.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImageSmall, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './Style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../untils'

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct((prev) => prev + 1);
        } else if (type === 'decrease') {
            if (numProduct > 1) {
                setNumProduct((prev) => prev - 1);
            }
        }
    };
    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    });

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {

            // name: { type: String, required: true },
            // amount: { type: Number, required: true },
            // image: { type: String, required: true },
            // price: { type: Number, required: true },
            // product: {
            //     type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            // },
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock,
                }
            }))
        }
    }
    console.log('productDetails', productDetails)
    return (
        <Loading isPending={isLoading}>
            <Row style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt='image product' preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                        <WrapperStyleColImageSmall span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} />
                        </WrapperStyleColImageSmall>
                    </Row>

                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao Đến </span>
                        <span className='address'>{user?.address}</span>
                        <span className='change-address'> - Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #ccc' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>

                            <WrapperInputNumber defaultValue={3} onChange={onChange} value={numProduct} size="small" />

                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            border={false}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 55, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            onClick={handleAddOrderProduct}
                            textButton={"Chọn Mua"}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                        <ButtonComponent
                            border={false}
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rbg(13, 92, 182) ',
                                borderRadius: '4px'
                            }}
                            textButton={"Mua Trả Sau"}
                            styleTextButton={{ color: 'rbg(13, 92, 182)', fontSize: '15px' }}>
                        </ButtonComponent>
                    </div>
                </Col>
            </Row>
            
        </Loading>
    )
}

export default ProductDetailsComponent