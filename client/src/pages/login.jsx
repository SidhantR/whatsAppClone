import { firebaseAuth } from '@/utils/FirebaseConfig'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import axios from 'axios'
import Image from 'next/image'
import {FcGoogle} from "react-icons/fc"

import {CHECK_USER_ROUTE} from '../../../server/utils/ApiRoutes'
import { useRouter } from 'next/router'

const login = () => {
  const router = useRouter()
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    console.log(provider, 'provider')
    const {user: {displayName: name, email, photoURL: profileImage}} = await signInWithPopup(firebaseAuth, provider)    

    try{
        if(email) {
            const {data} = await axios.post(CHECK_USER_ROUTE, {email})
            if(!data.status){
                router.push('/onboarding')
            }
        }
    } catch(err) {
        console.log(err, 'err-----')
    }
    
  }

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
        <div className='flex items-center justify-center gap-2 text-white'>
        <Image src ="/whatsapp.gif" alt='whatsapp' height={300} width={300} />
        <span className='text-7xl'>Whatsapp</span>
        </div>
        <button className='flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg' onClick={handleLogin}>
            <FcGoogle className='text-4xl'/>
            <span className='text-white text-2xl'>Login with Google</span>
        </button>
    </div>
  )
}

export default login