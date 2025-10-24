import { useChatStore } from "../store/useChatStore"

function ActiveTabSwitch() {

  const {activeTab,setActiveTab} = useChatStore()

  return (
    <div className="tabs bg-transparent p-2  w-full flex justify-center">
        <button className={`tab px-6 md:px-12 rounded-xl  ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`} onClick={() => setActiveTab("chats")}>Chats</button>
        <button className={`tab px-6 md:px-12 rounded-xl ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`} onClick={() => setActiveTab("contacts")}>Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
