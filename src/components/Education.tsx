import { GraduationCap, School, Award } from "lucide-react";

const Education = () => {
  const educationData = [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "Annai Mira College of Engineering and Technology",
      period: "2023 – 2027",
      status: "Pursuing",
      icon: GraduationCap,
      color: "from-primary to-primary/50",
    },
    {
      degree: "HSC – 90%",
      institution: "Bharathidasanar Matric Higher Secondary School",
      period: "2023",
      status: "Completed",
      icon: Award,
      color: "from-accent to-accent/50",
    },
    {
      degree: "SSLC – Pass",
      institution: "Bharathidasanar Matric Higher Secondary School",
      period: "2021",
      status: "Completed",
      icon: School,
      color: "from-primary to-accent",
    },
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

          <div className="space-y-10">
            {educationData.map((item, index) => (
              <div
                key={index}
                className="relative flex gap-6 md:gap-8 group"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 pb-2">
                  <div className="p-5 md:p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {item.period}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {item.institution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
