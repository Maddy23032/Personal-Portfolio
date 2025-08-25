import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Users } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="about" className="py-20 relative overflow-hidden">
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
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="w-[420px] h-[480px] rounded-2xl bg-gradient-primary p-1">
                  <div className="w-full h-full rounded-2xl bg-background-secondary flex items-center justify-center">
                    <img
                      src="/maddy.jpg"
                      alt="Profile"
                      className="w-[400px] h-[460px] rounded-2xl object-cover border-4 border-background-secondary shadow-lg"
                    />
                  </div>
                </div>
                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full animate-glow-pulse" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary rounded-full animate-floating" />
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Passionate Computer Science Engineer & Cyber Security Enthusiast
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A Computer Science Engineer and Programmer with strong problem-solving skills and a keen interest in Cybersecurity and Machine Learning. 
                Skilled in DSA and Generative AI, with hands-on experience in AI-driven cloud security technologies. An adaptable learner and flexible team player, 
                eager to explore Ethical Hacking, threat detection, and emerging technologies in the cybersecurity domain. 
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I am dedicated to continuous learning and growth, always seeking new challenges that push the boundaries of technology and creativity.
              </p>
              

            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;