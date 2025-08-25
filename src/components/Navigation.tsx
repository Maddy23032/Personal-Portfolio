import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Menu, X, Download, Github, Linkedin, Mail } from "lucide-react";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Maddy23032", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/madhukarthicka/", label: "LinkedIn" },
    { icon: 'leetcode', href: "https://leetcode.com/u/Madhu_Karthick/", label: "LeetCode" },
    { icon: 'monkeytype', href: "https://monkeytype.com/profile/MadhuKarthick", label: "Monkeytype" },
    { icon: Mail, href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold gradient-text"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-foreground hover:text-primary transition-colors animated-underline"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + 0.1 * index }}
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-card rounded-lg"
                aria-label={social.label}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {social.icon === 'leetcode' ? (
                  <img src="/leetcode.svg" alt="LeetCode" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                ) : social.icon === 'monkeytype' ? (
                  <img src="/monkeytype.svg" alt="Monkeytype" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                ) : (
                  <social.icon size={20} />
                )}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="https://drive.google.com/file/d/1sqasWK2gxIDUu881ygQcyImFEW1yqUiP/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlowButton variant="outline" size="sm" asChild>
                  <span>
                    <Download size={16} className="mr-2" />
                    Resume
                  </span>
                </GlowButton>
              </a>
            </motion.div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 glass-card rounded-lg p-6"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-foreground hover:text-primary transition-colors py-2 animated-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + 0.1 * index }}
                      className="text-muted-foreground hover:text-primary transition-colors p-2"
                      aria-label={social.label}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {social.icon === 'leetcode' ? (
                        <img src="/leetcode.svg" alt="LeetCode" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      ) : social.icon === 'monkeytype' ? (
                        <img src="/monkeytype.svg" alt="Monkeytype" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      ) : (
                        <social.icon size={20} />
                      )}
                    </motion.a>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <a
                    href="https://drive.google.com/file/d/1sqasWK2gxIDUu881ygQcyImFEW1yqUiP/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <GlowButton variant="outline" className="w-full" asChild>
                      <span>
                        <Download size={16} className="mr-2" />
                        Download Resume
                      </span>
                    </GlowButton>
                  </a>
                </motion.div>
                <div className="flex justify-end pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navigation;