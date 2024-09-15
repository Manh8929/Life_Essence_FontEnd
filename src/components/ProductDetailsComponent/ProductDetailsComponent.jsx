import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/blackmores-glucosamine-sulfate-1500-one-a-day-1-anhLon.jpg'
import imageProductSmall from '../../assets/images/blackmores-glucosamine-sulfate-1500-one-a-day-1-anhLon.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImageSmall, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './Style'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
const ProductDetailsComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', backgroundColor: '#fff' , borderRadius: '4px'}}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src={imageProduct} alt='image product' preview={false} />
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
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Bổ khớp Blackmores Glucosamine Sulfate 1500 One-A-Day của Úc</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)', marginLeft: '2px' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)', marginLeft: '2px' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)', marginLeft: '2px' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)', marginLeft: '2px' }} />
                    <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <h1>
                        <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
                    </h1>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao Đến</span>
                    <span className='address'>Q.Hải Châu, TP.Dà Nẵng</span>
                    <span className='change-address'>-Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{margin: '10px 0 20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #ccc'}}>
                    <div style={{marginBottom: '10px'}}>Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>

                        <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />

                        <button style={{ border: 'none', background: 'transparent' }}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <ButtonComponent
                        border ={false}
                        size={40}
                        styleButton={{
                             background: 'rgb(255, 55, 69)',
                             height: '48px',
                             width:'220px',
                            border: 'none',
                            borderRadius: '4px'
                         }}
                        textButton={"Chọn Mua"}
                        styleTextButton={{ color: '#fff' , fontSize: '15px',fontWeigh: '700'}}>
                    </ButtonComponent>
                    <ButtonComponent
                        border ={false}
                        size={40}
                        styleButton={{
                             background: '#fff',
                             height: '48px',
                             width:'220px',
                            border: '1px solid rbg(13, 92, 182) ',
                            borderRadius: '4px'
                         }}
                        textButton={"Mua Trả Sau"}
                        styleTextButton={{ color: 'rbg(13, 92, 182)', fontSize: '15px' }}>
                    </ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent