import React from 'react'
import ChatListHeader from './ChatListHeader'
import SearchBar from './SearchBar'

const ChatList = () => {
  return (
    <div className='bg-panel-header-background flex flex-col max-h-screen z-20 '>
        <>
        <ChatListHeader />
        <SearchBar />
        </>
    </div>
  )
}

export default ChatList