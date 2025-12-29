import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      variant="glow"
      className="fixed bottom-6 right-6 z-50 h-14 px-5 rounded-full shadow-lg animate-glow-pulse flex items-center gap-2"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium">Ask me</span>
    </Button>
  );
};

export default ChatButton;
