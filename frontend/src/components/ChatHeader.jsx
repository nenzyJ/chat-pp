import React from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon, ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);

    //cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className=" bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-3 sm:px-6 flex-1">
      <div className="flex items-center   justify-between space-x-2 sm:space-x-3 min-w-0 space-y-4 ">
        {/* Кнопка "Назад" для мобільних пристроїв */}
        <button
          onClick={() => setSelectedUser(null)}
          className="lg:hidden flex-shrink-0 p-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

         <button
          onClick={() => setSelectedUser(null)}
          className="hidden lg:flex flex-shrink-0 p-1"
        >
          <XIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
        </button>

        <div className="min-w-0 flex flex-col items-center">
          <h3 className="text-slate-200 font-medium text-sm sm:text-base truncate">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">Online</p>
        </div>

        <div className="avatar online flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        
        </div>

      </div>
    </div>
  );
};

export default ChatHeader;
