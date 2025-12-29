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
  name: "Prathap T",
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
    { name: "Online Portfolio Website", tech: ["HTML", "CSS", "JavaScript"], description: "Personal portfolio website with responsive design and modern UI/UX principles" }
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
  
  if (q.includes("name") || q.includes("who are you") || q.includes("who is prathap")) {
    return `Prathap T is a ${knowledgeBase.tagline}. ${knowledgeBase.about}`;
  }
  
  if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college") || q.includes("university")) {
    const { education } = knowledgeBase;
    return `**Education:**\n\n• **${education.degree}** at ${education.college} (${education.year})\n• **HSC:** ${education.hsc}\n• **SSLC:** ${education.sslc}`;
  }
  
  if (q.includes("skill") || q.includes("technology") || q.includes("tech stack") || q.includes("know")) {
    const { skills } = knowledgeBase;
    return `Prathap has expertise in:\n\n**Languages:** ${skills.languages.join(", ")}\n\n**Frontend:** ${skills.frontend.join(", ")}\n\n**Database:** ${skills.database.join(", ")}\n\n**Other:** ${skills.other.join(", ")}`;
  }
  
  if (q.includes("project") || q.includes("built") || q.includes("created") || q.includes("work")) {
    const projectList = knowledgeBase.projects.map(p => 
      `• **${p.name}**: ${p.description} (Built with ${p.tech.join(", ")})`
    ).join("\n\n");
    return `Here are Prathap's projects:\n\n${projectList}`;
  }
  
  if (q.includes("certification") || q.includes("certificate") || q.includes("course")) {
    return `**Certifications:**\n\n${knowledgeBase.certifications.map(c => `• ${c}`).join("\n")}`;
  }
  
  if (q.includes("goal") || q.includes("career") || q.includes("aspiration") || q.includes("future") || q.includes("objective")) {
    return `**Career Objective:**\n\n${knowledgeBase.careerObjective}`;
  }
  
  if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("connect") || q.includes("phone")) {
    return `**Contact Information:**\n\n• **Phone:** ${knowledgeBase.phone}\n• **Email:** ${knowledgeBase.email}\n• **LinkedIn:** linkedin.com/in/prathap-t`;
  }
  
  if (q.includes("frontend") || q.includes("html") || q.includes("css") || q.includes("javascript")) {
    return `In frontend development, Prathap is proficient in ${knowledgeBase.skills.frontend.join(", ")}. He specializes in Full Stack Frontend development.`;
  }
  
  if (q.includes("backend") || q.includes("database") || q.includes("sql")) {
    return `For database work, Prathap is skilled in ${knowledgeBase.skills.database.join(", ")}. He has experience with data management and queries.`;
  }
  
  if (q.includes("language") && (q.includes("speak") || q.includes("known") || q.includes("fluent"))) {
    return `**Languages Known:**\n\n${knowledgeBase.languages.map(l => `• ${l}`).join("\n")}`;
  }
  
  if (q.includes("python") || q.includes("java")) {
    return `Prathap is proficient in programming languages: ${knowledgeBase.skills.languages.join(" and ")}. He has completed Python Full Stack Development certification from Udemy.`;
  }
  
  if (q.includes("ui") || q.includes("ux") || q.includes("design")) {
    return `Prathap has skills in UI/UX Design and has completed a UI/UX Design certification from Udemy. He applies modern design principles in his projects.`;
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
