import { cn } from "@/lib/utils";

interface MessageProps {
  message: string;
  time: string;
  photoURL: string | null;
  isCurrentUser: boolean;
}

// const Message = ({ message, time, photoURL, isCurrentUser }: MessageProps) => {
//   return (
//     <article
//       className={cn("flex gap-x-2", {
//         "flex-row-reverse": isCurrentUser,
//         "flex-row": !isCurrentUser,
//       })}
//     >
//       <img
//         src={photoURL || "/default-avatar.jpg"}
//         alt=""
//         className="rounded-full size-10"
//       />
//       <div
//         className={cn("rounded-md p-2 text-gray-700 max-w-[70%]", {
//           "bg-blue-300": isCurrentUser,
//           "bg-white": !isCurrentUser,
//         })}
//       >
//         <p>{message}</p>
//         <p className="text-right text-xs">{time}</p>
//       </div>
//     </article>
//   );
// };







const Message = ({ message, time, photoURL, isCurrentUser }: MessageProps) => {
  return (
    <article
      className={`flex gap-x-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <img
        src={photoURL || "/default-avatar.jpg"}
        alt="avatar"
        className="rounded-full size-10"
      />
      <div
        className={`rounded-md p-2 max-w-[70%] ${isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
      >
        <p>{message}</p>
        <p className="text-right text-xs">{time}</p>
      </div>
    </article>
  );
};



export default Message;
