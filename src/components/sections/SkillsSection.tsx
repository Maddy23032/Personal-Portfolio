import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Programming & Data Science",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 90 },
        { name: "Pandas", level: 92 },
        { name: "NumPy", level: 92 },
        { name: "PyTorch", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "Machine Learning", level: 93 },
        { name: "NLP", level: 90 },
        { name: "Analytical thinking", level: 90 },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "Vite", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Touch-typing", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "HTML", level: 92 },
        { name: "Flask", level: 90 },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "WireShark", level: 80 },
        { name: "Streamlit", level: 95 },
        { name: "Postman", level: 85 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background opacity-80" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels
              across various technologies and tools.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-2 bg-background-tertiary rounded-full overflow-hidden">
                        <motion.div
                          variants={progressVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          custom={skill.level}
                          className="absolute left-0 top-0 h-full bg-gradient-primary rounded-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;