import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx"
import ChatsList from "../components/ChatsList.jsx"
import ContactsList from "../components/ContactsList.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import NoChatPlaceholder from "../components/NoChatPlaceholder.jsx"

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  // On mobile: show sidebar when no chat selected, hide when chat selected
  // On desktop: always show both sidebar and chat area
  const sidebarClasses = selectedUser 
    ? 'hidden md:flex w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col'
    : 'flex w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col';
  
  const chatAreaClasses = selectedUser
    ? 'flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm'
    : 'hidden md:flex flex-1 flex-col bg-slate-900/50 backdrop-blur-sm';

  return (  
    <div className="relative w-full max-w-5xl h-[600px] md:h-[675px]">
      <BorderAnimatedContainer>
        <div className={sidebarClasses}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        <div className={chatAreaClasses}>
            {selectedUser ? <ChatContainer/> : <NoChatPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
