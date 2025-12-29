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
  fatherName: "Thatchanamoorthy",
  motherName: "Gnanasoundhari",
  dateOfBirth: "07/12/2004",
  age: 21,
  phone: "7603892716",
  email: "prathapcse78@gmail.com",
  linkedin: "https://www.linkedin.com/in/prathap-t-57134130a",
  education: {
    degree: "B.E. Computer Science and Engineering",
    college: "Annai Mira College of Engineering and Technology",
    year: "2023–2027 (Pursuing)",
    hsc: "Bharathidasanar Matric Higher Secondary School - 90% (2023)",
    sslc: "Bharathidasanar Matric Higher Secondary School - Pass (2021)"
  },
  skills: {
    languages: ["Python", "Java"],
    frontend: ["HTML", "CSS", "JavaScript"],
    database: ["SQL"],
    other: ["UI/UX Design", "Ethical Hacking (Basics)"]
  },
  projects: [
    { name: "Code Mentor AI", tech: ["Python", "LangChain", "OpenAI", "React"], description: "AI-powered coding assistant for learning programming and debugging" },
    { name: "Cricket Scoreboard", tech: ["React", "JavaScript", "CSS"], description: "Real-time cricket scoreboard for tracking match scores" },
    { name: "RAG-based Applications", tech: ["Python", "LangChain", "Vector DB", "LLM"], description: "Intelligent chatbots using Retrieval-Augmented Generation" }
  ],
  certifications: [
    "UI/UX Design – Udemy",
    "Python Full Stack Development – Udemy",
    "Generative AI Powered Data Analytics (Job Simulation) – Forage"
  ],
  languages: ["Tamil (Fluent)", "English (Proficient)"],
  careerObjective: "To obtain a challenging position in the field of Computer Science where I can apply my technical and analytical skills for continuous learning and growth, while contributing to the success of the organization.",
  tagline: "CSE Student | Web Developer | AI Enthusiast",
  about: "A passionate Computer Science student pursuing B.E. at Annai Mira College of Engineering and Technology with keen interest in web development, UI/UX design, and artificial intelligence."
};

const findAnswer = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("name") && !q.includes("father") && !q.includes("mother") && !q.includes("parent")) {
    return `Prathap T`;
  }

  if (q.includes("father") || q.includes("dad")) {
    return `Thatchanamoorthy`;
  }

  if (q.includes("mother") || q.includes("mom")) {
    return `Gnanasoundhari`;
  }

  if (q.includes("parent")) {
    return `Father: Thatchanamoorthy\nMother: Gnanasoundhari`;
  }

  if (q.includes("birth") || q.includes("dob") || q.includes("born") || q.includes("birthday")) {
    return `07/12/2004`;
  }

  if (q.includes("age") || q.includes("old")) {
    return `21 years old`;
  }
  
  if (q.includes("who is") || q.includes("who are") || q.includes("about") || q.includes("tell me")) {
    return `${knowledgeBase.tagline}`;
  }

  if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college") || q.includes("university")) {
    return `B.E. Computer Science and Engineering at Annai Mira College of Engineering and Technology (2023–2027)`;
  }
  
  if (q.includes("skill") || q.includes("technology") || q.includes("tech stack")) {
    return `Python, Java, HTML, CSS, JavaScript, SQL, UI/UX Design`;
  }
  
  if (q.includes("project") || q.includes("built") || q.includes("created") || q.includes("work")) {
    return `Code Mentor AI, Cricket Scoreboard, RAG-based Applications`;
  }
  
  if (q.includes("certification") || q.includes("certificate") || q.includes("course")) {
    return `UI/UX Design, Python Full Stack Development, Generative AI (Forage)`;
  }
  
  if (q.includes("goal") || q.includes("career") || q.includes("aspiration") || q.includes("future") || q.includes("objective")) {
    return `To obtain a challenging position in Computer Science applying technical and analytical skills for continuous learning and growth.`;
  }
  
  if (q.includes("email")) {
    return `prathapcse78@gmail.com`;
  }

  if (q.includes("phone") || q.includes("number") || q.includes("mobile")) {
    return `7603892716`;
  }

  if (q.includes("contact") || q.includes("reach") || q.includes("connect")) {
    return `Phone: 7603892716\nEmail: prathapcse78@gmail.com`;
  }
  
  if (q.includes("linkedin")) {
    return `linkedin.com/in/prathap-t-57134130a`;
  }
  
  if (q.includes("frontend") || q.includes("html") || q.includes("css") || q.includes("javascript")) {
    return `HTML, CSS, JavaScript`;
  }
  
  if (q.includes("backend") || q.includes("database") || q.includes("sql")) {
    return `SQL`;
  }
  
  if (q.includes("language") && (q.includes("speak") || q.includes("known") || q.includes("fluent"))) {
    return `Tamil (Fluent), English (Proficient)`;
  }
  
  if (q.includes("python") || q.includes("java")) {
    return `Python, Java`;
  }
  
  if (q.includes("ui") || q.includes("ux") || q.includes("design")) {
    return `UI/UX Design (Udemy Certified)`;
  }
  
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hello! 👋 I'm Prathap Assistant, here to help you learn about Prathap T. Feel free to ask me about his skills, projects, education, certifications, or career goals!`;
  }

  if (q.includes("help") || q.includes("can you")) {
    return `I can help you learn about Prathap! Try asking about:\n\n• His **skills** and technologies\n• His **projects** and work\n• His **education** background\n• His **certifications**\n• His **career goals**\n• How to **contact** him`;
  }
  
  return "Sorry, I don't have specific information about that yet. Feel free to ask about Prathap's skills, projects, education, certifications, or career goals!";
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
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
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
