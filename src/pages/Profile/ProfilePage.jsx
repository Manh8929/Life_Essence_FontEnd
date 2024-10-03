import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './Style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/userMutationHooks'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/MessageComponent/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../untils'


const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const { data, isPending, isSuccess, isError } = mutation
    const dispatch = useDispatch()
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {

        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value)

    }
    const handleOnChangePhone = (value) => {
        setPhone(value)

    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)

    }
    const handleOnChangeAvatar = async({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setAvatar(file.preview)

    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Infomation User</WrapperHeader>
            <Loading isPending={isPending}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id='name' value={name} onChange={handleOnChangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={"Update"}
                            styleTextButton={{ color: '#00ccff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id='email' value={email} onChange={handleOnChangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={"Update"}
                            styleTextButton={{ color: '#00ccff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id='address' value={address} onChange={handleOnChangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={"Update"}
                            styleTextButton={{ color: '#00ccff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id='phone' value={phone} onChange={handleOnChangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={"Update"}
                            styleTextButton={{ color: '#00ccff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </WrapperUploadFile>
                        {avatar &&(
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'

                            }}alt='avatar'/>
                        )}
                        {/* <InputForm style={{ with: '300px' }} id='avatar' value={avatar} onChange={handleOnChangeAvatar} /> */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textButton={"Update"}
                            styleTextButton={{ color: '#00ccff', fontSize: '15px', fontWeigh: '700' }}>
                        </ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage