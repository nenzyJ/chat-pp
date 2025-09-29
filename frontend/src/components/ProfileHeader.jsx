import React from "react";
import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio(
  "/sounds/frontend_public_sounds_mouse-click.mp3"
);

// Функція для компресії зображення
const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Розрахувати нові розміри з збереженням пропорцій
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Малювати зображення на canvas
      ctx.drawImage(img, 0, 0, width, height);
      
      // Конвертувати в base64 з компресією
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    
    console.log("Original file size:", file.size, "bytes");
    setIsUploading(true);
    
    try {
      // Компресувати зображення перед завантаженням
      const compressedBase64 = await compressImage(file);
      console.log("Compressed base64 length:", compressedBase64.length);
      console.log("Compression ratio:", (compressedBase64.length / (file.size * 1.33)).toFixed(2));
      
      setSelectedImg(compressedBase64);
      
      try {
        console.log("Sending to updateProfile...");
        await updateProfile({ profilePic: compressedBase64 });
        console.log("Profile updated successfully");
        // Очистити input для можливості завантажити те ж саме зображення знову
        e.target.value = '';
      } catch (updateError) {
        console.error("Error in updateProfile:", updateError);
        setSelectedImg(null); // Скинути selectedImg при помилці
      }
    } catch (error) {
      console.error("Error compressing image:", error);
      setSelectedImg(null);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm">Uploading...</span>
                </div>
              )}
              {!isUploading && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm">Change</span>
                </div>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* SOUND ICON */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0; // rest to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play field:", error));
              toggleSound();
            }}
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
};

export default ProfileHeader;
