import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Portfolio = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Maddy23032", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/madhukarthicka/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Maddyxacct", label: "Twitter" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative py-12 border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold gradient-text mb-2">
                Portfolio
              </div>
              <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start">
                © {currentYear} Made with{" "}
                <Heart size={16} className="mx-1 text-red-500 animate-glow-pulse" />{" "}
                by Madhu Karthick
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-card rounded-lg"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <motion.a
              href="#home"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors animated-underline"
              whileHover={{ y: -2 }}
            >
              Back to Top
            </motion.a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Portfolio;