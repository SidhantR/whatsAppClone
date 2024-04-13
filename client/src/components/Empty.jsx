import Image from 'next/image'
import React from 'react'

const Empty = () => {
  return (
    <div className='border-converstaion-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-icon-green items-center justify-center '>
        <Image src= "/whatsapp.gif" alt="whatsapp" height={300} width={300} />
    </div>
  )
}

export default Empty