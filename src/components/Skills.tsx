import { Code, Database, Cpu, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      color: "from-primary to-primary/50"
    },
    {
      title: "Backend",
      icon: Database,
      skills: ["Node.js", "Express", "SQL", "MongoDB", "REST APIs"],
      color: "from-accent to-accent/50"
    },
    {
      title: "AI/ML",
      icon: Cpu,
      skills: ["RAG Systems", "LLM Integration", "Embeddings", "Vector DBs"],
      color: "from-primary to-accent"
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: ["Git", "GitHub", "Figma", "VS Code", "Postman"],
      color: "from-accent to-primary"
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="glass-card-hover p-6 group"
            >
              <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="font-display font-semibold text-xl mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
