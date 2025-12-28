import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ChatButton from "@/components/ChatButton";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero onOpenChat={() => setIsChatOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      
      {/* Chat components */}
      <ChatButton onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
