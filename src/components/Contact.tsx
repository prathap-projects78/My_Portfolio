import { Mail, Linkedin, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:prathap@example.com",
      label: "prathap@example.com"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/prathap",
      label: "linkedin.com/in/prathap"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/prathap",
      label: "github.com/prathap"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            I'm always open to discussing new opportunities, projects, or just having a chat about technology.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-10">
            <div className="grid gap-6 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{link.name}</p>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#" download>
                  <Download className="mr-2" /> Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
