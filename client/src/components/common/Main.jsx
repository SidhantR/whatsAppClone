import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChatList from '../Chatlist/ChatList.jsx'
import Empty from './Empty'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig.js'
import { CHECK_USER_ROUTE } from '../../../../server/utils/ApiRoutes.js'
import { useRouter } from 'next/router.js'
import { useStateProvider } from '@/context/StateContext.js'
import { reducerCases } from '@/context/constants.js'
import Chat from '../Chat/Chat.jsx'

const Main = () => {
    const router = useRouter()
    const [{userInfo}, dispatch] = useStateProvider()
    const [redirectLogin, setRedirectLogin] = useState(false)

    useEffect(() => {
        if(redirectLogin) router.push("/login")
    }, [redirectLogin])

    //run whenever page load 
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if(!currentUser) setRedirectLogin(true)
        if(!userInfo && currentUser?.email){
            const {data} = await axios.post(CHECK_USER_ROUTE, {email: currentUser.email})
            if(!data.status){
                router.push("/login")
            }
            if(data?.data){
                const {id, name, email, profilePicture: profileImage, status} = data.data
                dispatch({
                    type: reducerCases.SET_USER_INFO,
                    userInfo: {id, name, email, profileImage, status}
                })
            }
        }
        
    })

  return (
    <div className='grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden '>
        <ChatList />
        {/* <Empty /> */}
        <Chat />
    </div>
  )
}

export default Main