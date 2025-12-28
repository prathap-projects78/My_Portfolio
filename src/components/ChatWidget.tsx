import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Knowledge base for RAG simulation
const knowledgeBase = {
  name: "Prathap",
  education: "B.E. in Computer Science & Engineering, graduating 2027",
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    backend: ["Node.js", "Express", "SQL", "MongoDB"],
    aiml: ["RAG Systems", "LLM Integration", "Embeddings", "Vector Databases"],
    tools: ["Git", "GitHub", "Figma", "VS Code", "Postman"]
  },
  projects: [
    { name: "Calculator Web App", tech: ["HTML", "CSS", "JavaScript"], description: "A fully functional calculator with modern UI" },
    { name: "Cricket Scoreboard", tech: ["React", "JavaScript", "CSS"], description: "Real-time cricket match tracking application" },
    { name: "RAG-based Applications", tech: ["Python", "LangChain", "Vector DB", "LLM"], description: "Intelligent chatbots using RAG architecture" }
  ],
  careerGoals: "Full Stack Development and AI/ML Applications",
  tagline: "CSE Student | Web Developer | AI Enthusiast",
  about: "A passionate Computer Science student with keen interest in web development and artificial intelligence."
};

const findAnswer = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("name") || q.includes("who are you") || q.includes("who is prathap")) {
    return `Prathap is a ${knowledgeBase.tagline}. ${knowledgeBase.about}`;
  }
  
  if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college") || q.includes("university")) {
    return `Prathap is pursuing a ${knowledgeBase.education}. He is focused on building a strong foundation in computer science fundamentals and modern development practices.`;
  }
  
  if (q.includes("skill") || q.includes("technology") || q.includes("tech stack") || q.includes("know")) {
    const { skills } = knowledgeBase;
    return `Prathap has expertise in multiple areas:\n\n**Frontend:** ${skills.frontend.join(", ")}\n\n**Backend:** ${skills.backend.join(", ")}\n\n**AI/ML:** ${skills.aiml.join(", ")}\n\n**Tools:** ${skills.tools.join(", ")}`;
  }
  
  if (q.includes("project") || q.includes("built") || q.includes("created") || q.includes("work")) {
    const projectList = knowledgeBase.projects.map(p => 
      `• **${p.name}**: ${p.description} (Built with ${p.tech.join(", ")})`
    ).join("\n\n");
    return `Here are Prathap's notable projects:\n\n${projectList}`;
  }
  
  if (q.includes("goal") || q.includes("career") || q.includes("aspiration") || q.includes("future")) {
    return `Prathap's career focus is on ${knowledgeBase.careerGoals}. He is passionate about building innovative solutions that combine modern web technologies with cutting-edge AI capabilities.`;
  }
  
  if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("connect")) {
    return "You can connect with Prathap through the Contact section on this portfolio. He's available via Email, LinkedIn, and GitHub. Feel free to reach out for opportunities or collaborations!";
  }
  
  if (q.includes("frontend") || q.includes("react") || q.includes("javascript")) {
    return `In frontend development, Prathap is proficient in ${knowledgeBase.skills.frontend.join(", ")}. He enjoys creating modern, responsive user interfaces with clean code.`;
  }
  
  if (q.includes("backend") || q.includes("node") || q.includes("database") || q.includes("server")) {
    return `For backend development, Prathap works with ${knowledgeBase.skills.backend.join(", ")}. He has experience building RESTful APIs and working with both SQL and NoSQL databases.`;
  }
  
  if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("artificial intelligence") || q.includes("rag") || q.includes("llm")) {
    return `Prathap is exploring the exciting field of AI/ML, with a focus on ${knowledgeBase.skills.aiml.join(", ")}. He's particularly interested in building RAG-based applications that provide accurate, context-aware responses.`;
  }
  
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hello! 👋 I'm Prathap Assistant, here to help you learn about Prathap. Feel free to ask me about his skills, projects, education, or career goals!`;
  }

  if (q.includes("help") || q.includes("can you")) {
    return `I can help you learn about Prathap! Try asking about:\n\n• His **skills** and technologies\n• His **projects** and work\n• His **education** background\n• His **career goals**\n• How to **contact** him`;
  }
  
  return "Sorry, I don't have specific information about that yet. Feel free to ask about Prathap's skills, projects, education, or career goals!";
};

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Prathap Assistant 🤖. Ask me anything about Prathap's skills, projects, education, or experience!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    // Simulate RAG processing delay
    setTimeout(() => {
      const response = findAnswer(userMessage);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] animate-slide-up">
      <div className="glass-card overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-primary-foreground">Prathap Assistant</h3>
              <p className="text-xs text-primary-foreground/70">Ask me anything about Prathap</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                message.role === "user" ? "bg-primary" : "bg-accent"
              }`}>
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-br-md" 
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-secondary p-3 rounded-2xl rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about skills, projects..."
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
            />
            <Button 
              variant="hero" 
              size="icon" 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="shrink-0 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
