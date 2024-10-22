import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountLogo, WrapperDiscountLogoAfter, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './Style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../untils'

const CardComponent = (props) => {
     const {countInStock,description,image, name, price, rating, type, discount,selled, id} = props
     const navigate = useNavigate()
     const handleDetailsProduct =(id)=>{
         navigate(`/product-details/${id}`)
     }
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{padding: '10px'}}
            style={{ width: '303px' }}
            cover={<img width= '200px' height= '200px' alt="example" src={image} />}
            onClick={()=>countInStock!==0 && handleDetailsProduct(id)}
            disabled = {countInStock===0}
        >
            <WrapperDiscountLogo>sale 40%</WrapperDiscountLogo>
            <WrapperDiscountLogoAfter/>
            <div>
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReporText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating}</span>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' ,marginLeft:'2px'}} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled|| 1000} +</WrapperStyleTextSell>
            </WrapperReporText>
                <WrapperPriceText style={{whiteSpace:'nowrap'}}>
                    <span style={{ marginRight: '6px' }}>{convertPrice(price)} </span>
                <WrapperDiscountText>-{discount || 5} %</WrapperDiscountText>
                </WrapperPriceText>
            </div>
           
        </WrapperCardStyle>
    )
}

export default CardComponent