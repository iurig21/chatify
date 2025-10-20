import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Loader } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { toggleSound, isSoundEnabled } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
      setSelectedImg(base64Image);
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-online">
            <button
              onClick={() => fileInputRef.current.click()}
              className="cursor-pointer size-14 rounded-full overflow-hidden relative group"
            >
              {isUpdatingProfile ? (
                <Loader className="animate-spin ml-4" />
              ) : (
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="User image"
                  className="size-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs "> Change </span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImgUpload}
              className="hidden"
              disabled={isUpdatingProfile}
            />
          </div>
          <div className="text-slate-200 font-medium text-base max-w-[180px] truncate">
            <h3>{authUser.fullName}</h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={logout}
            className="cursor-pointer text-slate-400 hover:text-slate-200 transition-colors"
          >
            <LogOutIcon className="size-5" />
          </button>
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((err) => console.error("Audio play failed:", err));
              toggleSound();
            }}
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
