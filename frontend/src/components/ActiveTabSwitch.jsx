import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        className={`tab ${
          activeTab === "chats" ? "bg-cyan-400 text-blue-950" : "text-slate-400"
        }`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>
      <button
        className={`tab ${
          activeTab === "contacts" ? "bg-cyan-400 text-blue-950" : "text-slate-400"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
