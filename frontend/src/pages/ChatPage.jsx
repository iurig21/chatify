import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx"
import ChatsList from "../components/ChatsList.jsx"
import ContactsList from "../components/ContactsList.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import NoChatPlaceholder from "../components/NoChatPlaceholder.jsx"

function ChatPage() {
  const { activeTab,selectedUser } = useChatStore();

  return (  
    <div className="relative w-full max-w-5xl md:h-[675px] h-[650px]">
      <BorderAnimatedContainer>
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm space-y-3">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm ">
            {selectedUser ? <ChatContainer/> : <NoChatPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
