import Friends from "@/components/chat/friends";
import Messages from "@/components/chat/messages";
import Profile from "@/components/chat/profile";
import { useState, useEffect } from "react";

const ChatLayout = () => {
  const [activeTab, setActiveTab] = useState("friends"); // Para controlar la navegación en mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

  
    handleResize();

    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen">
      {/* Vista Desktop */}
      {!isMobile ? (
        <div className="grid grid-cols-[1fr_3fr_1fr] h-full">
          <div className="overflow-y-auto custom-scrollbar md:w-60">
            <Friends />
          </div>
          <div className="overflow-y-auto custom-scrollbar">
            <Messages />
          </div>
          <div className="border-l border-gray-200 overflow-y-auto custom-scrollbar">
            <Profile />
          </div>
        </div>
      ) : (
        <>
          {/* Navegación Mobile */}
          <div className="h-full pb-16"> 
            {activeTab === "friends" && <Friends />}
            {activeTab === "messages" && <Messages />}
            {activeTab === "profile" && <Profile />}
          </div>

          {/* Navegación Inferior */}
          <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3 z-10">
            <button
              onClick={() => setActiveTab("friends")}
              className={activeTab === "friends" ? "text-blue-400" : ""}
            >
              Amigos
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={activeTab === "messages" ? "text-blue-400" : ""}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={activeTab === "profile" ? "text-blue-400" : ""}
            >
              Perfil
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default ChatLayout;
