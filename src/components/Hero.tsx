import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import prathapPhoto from "@/assets/prathap-photo.png";

interface HeroProps {
  onOpenChat: () => void;
}

const Hero = ({ onOpenChat }: HeroProps) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl opacity-70 blur-sm" />
            <div className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-xl overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-float">
              <img 
                src={prathapPhoto} 
                alt="Prathap - Software Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Available for opportunities</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
              <span className="gradient-text">Prathap T</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              CSE Student • Web Developer • AI Enthusiast
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Passionate about building modern web applications and exploring the frontiers of artificial intelligence. 
              Currently pursuing B.E. in Computer Science.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" onClick={onOpenChat}>
                <MessageCircle className="mr-2" /> Chat with Prathap Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
