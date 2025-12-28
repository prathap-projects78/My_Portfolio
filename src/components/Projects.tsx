import { ExternalLink, Github, Calculator, Trophy, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Calculator Web App",
      description: "A fully functional calculator with a clean, modern interface. Supports basic arithmetic operations with a responsive design that works on all devices.",
      tech: ["HTML", "CSS", "JavaScript"],
      icon: Calculator,
      color: "from-primary to-primary/60",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Cricket Scoreboard",
      description: "Real-time cricket scoreboard application for tracking match scores, player statistics, and game progress with an intuitive user interface.",
      tech: ["React", "JavaScript", "CSS"],
      icon: Trophy,
      color: "from-accent to-accent/60",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "RAG-based Applications",
      description: "Intelligent chatbot applications using Retrieval-Augmented Generation. Combines vector embeddings with LLMs to provide accurate, context-aware responses.",
      tech: ["Python", "LangChain", "Vector DB", "LLM"],
      icon: Bot,
      color: "from-primary to-accent",
      demoLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass-card-hover overflow-hidden group"
            >
              {/* Header with icon */}
              <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <project.icon className="w-16 h-16 text-primary-foreground/80 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-xl mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={project.demoLink}>
                      <ExternalLink className="w-4 h-4 mr-2" /> Demo
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="flex-1">
                    <a href={project.githubLink}>
                      <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
