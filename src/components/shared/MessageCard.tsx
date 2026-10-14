import { cn } from "cn";
import { UIMessage } from "./ChatWindow";
import { SpinnerMsgIcon } from "../icon/SpinnerMsgIcon";

export function MessageCard({
  message,
  senderId,
}: {
  message: UIMessage;
  senderId: string;
}) {
  return (
    <div
      key={message.id}
      className={cn(
        "max-w-[70%] rounded-2xl p-2 flex items-center justify-center gap-1",
        message.receiverId === senderId
          ? "self-start bg-slate-500/70"
          : "self-end bg-sky-600/70",
      )}
    >
      {message.content}
      {message.status === "pending" && <SpinnerMsgIcon />}
    </div>
  );
}
