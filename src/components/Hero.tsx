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
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 animate-float">
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
              Hi, I'm <span className="gradient-text">Prathap</span>
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
