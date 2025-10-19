import { useAuthStore } from "../store/useAuthStore"

function ChatPage() {

const {logout} = useAuthStore()

  return (
    <div className="z-10">
        <button  onClick={logout} className="cursor-pointer bg-amber-400">Logout</button>
    </div>
  )
}

export default ChatPage
