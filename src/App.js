import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './untils'
import { jwtDecode } from 'jwt-decode'
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'



function App() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config)=> {
    // Do something before request is sent
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if (decoded?.exp < currentTime.getTime()/1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
      return config;
  }, (err)=> {
    // Do something with request error
    return Promise.reject(err);
  })

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))


  }
  return (
    <div>
      <Loading isPending={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isCheckAuth =!route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            if (route.path && typeof route.path === 'string') {
            return (
              <Route key={route.path} path={isCheckAuth ? route.path : '/'} element={
                <Layout>
                  <Page />
                </Layout>
              } />

            )
          }
          return null;
          }
          )}
        </Routes>
      </Router>
      </Loading>

    </div>
  )
}
export default App