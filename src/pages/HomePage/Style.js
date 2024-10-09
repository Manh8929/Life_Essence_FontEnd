import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content:  space-around;
    height: 44px;
    font-weight: 500;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13, 92, 182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled? 'not-allowed' : 'pointer'};
`
export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    flex-wrap: wrap;
    gap: 15px;
`