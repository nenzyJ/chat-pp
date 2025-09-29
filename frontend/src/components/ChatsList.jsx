import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';

const ChatsList = () => {
  const {getMyChatPartners, chats, isUsersLoading, setSelectUser} = useChatStore();

  useEffect(() => {
    getMyChatPartners()
  }, [getMyChatPartners])

  if(isUsersLoading) return <UsersLoadingSkeleton/>
  if(chats.length === 0) return <NoChatsFound />
  return (
    <div className="flex flex-col space-y-2">
      {chats.map(chat => {
        return (
          <div key={chat._id} className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors' onClick={() => setSelectUser(chat)}>
            <div className='flex items-center gap-3'>
              <div className={`avatar online`}>
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "avatar.png"} alt={chat.fullName} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatsList
