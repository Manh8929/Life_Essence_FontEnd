import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 20px;
    margin: 15px 0;
    text-align: center;
    font-weight: 500;
`
export const WrapperContentProfile = styled.div`
   display: flex;
   flex-direction: column;
   border: 1px solid #ccc;
   width: 500px;
   margin: 0 auto;
   padding: 30px;
   border-radius: 15px;
   gap: 30px;
   margin-top: 20px;
`
export const WrapperLabel = styled.label`
   color: #000;
   font-size: 12px;
   line-height: 30px;
   font-weight: 600;
   width: 100px;
   text-align: left;
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none;
    }

`