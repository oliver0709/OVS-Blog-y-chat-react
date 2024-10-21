// import Friends from "@/components/chat/friends";
// import Messages from "@/components/chat/messages";
// import Profile from "@/components/chat/profile";

// const ChatLayout = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] h-screen">
//      <p>Este es el contenido de ejemplo para verificar que se está renderizando correctamente.</p>
//       <Friends />
//       <Messages />
//       <Profile />
//     </div>
//   );
// };
// export default ChatLayout;

import Friends from "@/components/chat/friends";
import Messages from "@/components/chat/messages";
import Profile from "@/components/chat/profile";

const ChatLayout = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] h-screen">
      <Friends />
      <Messages />
      <Profile />
    </div>
  );
};
export default ChatLayout;