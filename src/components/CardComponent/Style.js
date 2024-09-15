import { Card } from "antd";
import styled from "styled-components";


export const WrapperCardStyle = styled(Card)`
    & img{
        height: 150px;
        width: 150px;
        margin: 30px 0;
        display: block;
        object-fit: contain;
        transition: transform 0.3s, opacity 0.3s; 
        padding-left: 6px;
    }
    & img:hover {
        transform: scale(1.1); /* Phóng to ảnh lên 1.1 lần khi hover */
        opacity: 0.8; /* Giảm độ trong suốt xuống 0.8 */
        
    }
    position: relative;
    display: flex;

    
`

export const WrapperDiscountLogo = styled.span`
    left: -6px;
    font-size: 17px;
    font-weight: 300;
    border-radius: 8px 8px 8px 0;
    padding: 3px 4px;
    background: Red;
    line-height: 1.2;
    min-width: 0;
    min-height: 0;
    margin: 0;
    top: 10px;
    right: auto;
    position: absolute;
    z-index: 9;
    
`
export const WrapperDiscountLogoAfter = styled.span`
    content: '';
    border: medium solid DarkRed;
    border-bottom-left-radius: 100%;
    position: absolute;
    left: 0;
    top: 35px;
    font-size: 17px;
    font-weight: 300;
    left: -6px;
    font-size: 17px;
    font-weight: 300;
    
`
export const StyleNameProduct = styled.div`
    margin: 1 10px;
    color: #03c09c;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden
    
`

export const WrapperReporText = styled.div`
    font-size: 11px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
    white-space: nowrap
`
export const WrapperPriceText = styled.div`
    font-size: 16px;
    color: rgb(255,66,78);
    font-weight: 500;

`
export const WrapperDiscountText = styled.span`
    font-size: 12px;
    color: rgb(255,66,78);
    font-weight: 500;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15;
    line-height: 24px;
    color: rgb(120,120,120);
`