import { useStateProvider } from '@/context/StateContext'
import dynamic from 'next/dynamic'
import React from 'react'

const Container = dynamic(() => import("./Container"), {ssr: false})

const VideoCall = () => {

    const [{videoCall, socket, userInfo}] = useStateProvider()

  return ( <Container data={videoCall} /> )
}

export default VideoCall