import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Malware Classification using Static Analysis Techniques",
      description: "Developing an AI-powered system that classifies malware families by static analysis without executing the malicious code. Looking to introduce novelty by implementing Graph Neural Network(GNN) which enhances the accuracy of the classification.",
      tech: ["Python", "TensorFlow", "Streamlit", "VirusTotal"],
      image: "/malware.jpeg",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Fake Social Media Detection system",
      description: "Enhanced the performance of the fake social media detection system with Random Forest model up to 99.4% accuracy.",
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      image: "/fakeprofile.jpeg",
      liveUrl: "#",
      githubUrl: "https://github.com/Maddy23032/Fake-Social-Media-Detection",
      featured: true,
    },
    {
      id: 3,
      title: "UniLang: a Multilingual NLP system",
      description: "Developed an application which is based on API that supports prompt and response in 50 languages with voice response.",
      tech: ["Python", "Flask", "Streamlit", "OpenAI"],
      image: "/nlp.jpeg",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Fake News Detection system",
      description: "Developed a fake news detection system using machine learning models such as logistic regression and Decision Tree Classifier. Enhanced the accuracy of the model upto 98%",
      tech: [ "Python", "Scikit-learn", "Pandas", "NumPy"],
      image: "/fakenews.jpeg",
      liveUrl: "#",
      githubUrl: "https://github.com/Maddy23032/Fake-news-detection-system",
      featured: false,
    },
    {
      id: 5,
      title: "StackIt",
      description: "A collaborative Q&A platform for developers, learners, and knowledge sharers. Ask questions, share knowledge, and build a community of learning together.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/Q&A.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Maddy23032/stackit",
      featured: false,
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

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background-secondary via-background-tertiary to-background-secondary opacity-90" />
      
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
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work, featuring innovative solutions and cutting-edge technologies.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass-card group overflow-hidden relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden bg-background-tertiary aspect-video">
                  <div className="absolute inset-0 bg-gradient-glow opacity-20" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-background/90 flex items-center justify-center space-x-4"
                  >
                    <GlowButton variant="outline" size="sm">
                      <Play size={16} className="mr-2" />
                      Demo
                    </GlowButton>
                    <GlowButton variant="ghost" size="sm">
                      <Github size={16} className="mr-2" />
                      Code
                    </GlowButton>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex space-x-2">
                      <a
                        href={project.liveUrl}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View Live"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View Code"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-background-tertiary text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-primary text-primary-foreground rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;