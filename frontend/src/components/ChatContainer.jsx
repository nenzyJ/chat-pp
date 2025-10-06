import React from 'react'
import { useChatStore } from '../store/useChatStore';
import {useAuthStore} from '../store/useAuthStore'
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import ImageModal from './ImageModal';

const ChatContainer = () => {
  const {
    selectedUser, 
    getMessagesByUserId, 
    messages, 
    isMessagesLoading,
    isImageModalOpen,
    selectedImageUrl,
    openImageModal,
    closeImageModal
  } = useChatStore()
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null)

  // Функция для обработки клика на изображение
  const handleImageClick = (imageUrl) => {
    openImageModal(imageUrl);
  }


  useEffect(() => {
    if (selectedUser?. _id && typeof getMessagesByUserId === "function") {
      getMessagesByUserId(selectedUser._id)
    }
  }, [selectedUser, getMessagesByUserId])
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages])
  return (
    <>
      <ChatHeader/>
      <div className='flex-1 px-6 overflow-y-auto py-8'>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map(msg => (
              <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt='Shared' 
                      className='rounded-lg h-48 object-cover cursor-pointer' 
                      onClick={() => handleImageClick(msg.image)}
                      title="Натисніть для розширеного перегляду"
                    />
                  )}
                  {msg.text && <p className='mt-2'>{msg.text}</p>}
                  <p className='text-sm mt-1 opacity-75 flex items-center gap-1'>
                    {new Date(msg.createdAt).toISOString().slice(11,16)}
                  </p>

                </div>
              </div>
            ))}
            <div ref={messageEndRef}/>
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton/> : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
      
      {/* Модальное окно для изображений */}
      <ImageModal 
        isOpen={isImageModalOpen}
        imageUrl={selectedImageUrl}
        onClose={closeImageModal}
      />
    </>
  )
}

export default ChatContainer
