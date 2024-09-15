import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountLogo, WrapperDiscountLogoAfter, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './Style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{padding: '10px'}}
            style={{ width: '303px' }}
            cover={<img width= '200px' height= '200px' alt="example" src="https://heluva.vn/wp-content/uploads/2020/03/blackmores-glucosamine-sulfate-1500-one-a-day-1.jpg" />}
        >
            <WrapperDiscountLogo>sale 40%</WrapperDiscountLogo>
            <WrapperDiscountLogoAfter/>
            <div>
            <StyleNameProduct>Glucosamin</StyleNameProduct>
            <WrapperReporText>
                <span style={{marginRight: '4px'}}>
                    <span>4.96</span>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' ,marginLeft:'2px'}} />
                </span>
                <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
            </WrapperReporText>
                <WrapperPriceText style={{whiteSpace:'nowrap'}}>
                    <span style={{marginRight: '6px'}}>13.000.000d </span>
                <WrapperDiscountText>-25%</WrapperDiscountText>
                </WrapperPriceText>
            </div>
           
        </WrapperCardStyle>
    )
}

export default CardComponent