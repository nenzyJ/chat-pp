import React from "react";
import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAmimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";
import { MenuIcon } from "lucide-react";

const ChatPage = () => {
  const { 
    activeTab, 
    selectedUser, 
    isMobileMenuOpen, 
    toggleMobileMenu, 
    closeMobileMenu 
  } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-screen sm:h-[700px] lg:h-[800px] mx-auto">
      <BorderAnimatedContainer>
        {/* LEFT SIDE - Desktop Sidebar */}
        <div className={`
          w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col
          lg:flex hidden 
          ${isMobileMenuOpen ? 'lg:flex' : 'lg:flex'}
        `}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex flex-col overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden absolute top-4 left-4 z-50">
          <button
            onClick={toggleMobileMenu}
            className="bg-slate-800/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-slate-700/80 transition-colors"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`
          lg:hidden fixed top-0 left-0 h-full w-80 bg-slate-800/95 backdrop-blur-sm flex flex-col z-50 transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex flex-col overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm min-w-0">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceHolder />
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
