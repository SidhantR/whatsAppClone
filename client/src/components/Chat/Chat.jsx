import React from 'react'
import MessageBar from './MessageBar'
import ChatContainer from './ChatContainer'
import ChatHeader from './ChatHeader'

const Chat = () => {
  return (
    <div className='border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10 '>
        <ChatHeader />
        <ChatContainer/>
        <MessageBar />
    </div>
  )
}

export default Chat