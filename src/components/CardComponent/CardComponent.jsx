import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText } from './Style'
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{width: '200px',height: '200px'}}
            style={{ width: 200 }}
            cover={<img alt="example" src="https://heluva.vn/wp-content/uploads/2020/03/blackmores-glucosamine-sulfate-1500-one-a-day-1.jpg" />}
        >
            <StyleNameProduct>Glucosamin</StyleNameProduct>
            <WrapperReporText>
                <span style={{marginRight: '4px'}}>
                    <span>4.96</span>
                    <StarFilled style={{ fontSize: '12px', color: 'yellow' ,marginLeft:'2px'}} />
                </span>
                <span>| Đã bán 1000+</span>
            </WrapperReporText>
                <WrapperPriceText>1.000.000d 
                    <WrapperDiscountText>-5%</WrapperDiscountText>
                </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent