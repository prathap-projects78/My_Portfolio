import { GraduationCap, Target, Code2 } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "B.E. in Computer Science & Engineering, graduating 2027"
    },
    {
      icon: Target,
      title: "Career Focus",
      description: "Full Stack Development & AI/ML Applications"
    },
    {
      icon: Code2,
      title: "Passion",
      description: "Building innovative solutions with modern technologies"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a passionate Computer Science student with a keen interest in web development and artificial intelligence. 
              My journey in tech began with curiosity about how software shapes our world, and has evolved into a dedicated 
              pursuit of building impactful applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in writing clean, maintainable code and constantly learning new technologies. 
              Currently, I'm exploring the exciting intersection of web development and AI, building projects 
              that leverage both traditional web technologies and cutting-edge AI capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="glass-card-hover p-6 text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
