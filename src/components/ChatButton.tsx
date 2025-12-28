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
      size="icon"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg animate-glow-pulse"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default ChatButton;
