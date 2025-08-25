import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { GlowButton } from "@/components/ui/glow-button";
import FloatingShape from "@/components/FloatingShape";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowDown, Code, Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* 3D Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          <Float speed={1} rotationIntensity={1} floatIntensity={2}>
            <FloatingShape position={[-4, 2, 0]} geometry="box" color="#00f5ff" scale={0.8} />
          </Float>
          
          <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
            <FloatingShape position={[4, -2, -2]} geometry="sphere" color="#8b5cf6" scale={0.6} />
          </Float>
          
          <Float speed={0.8} rotationIntensity={0.8} floatIntensity={2.5}>
            <FloatingShape position={[0, 3, -3]} geometry="torus" color="#10b981" scale={0.5} />
          </Float>
          
          <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.8}>
            <FloatingShape position={[-2, -3, 1]} geometry="box" color="#f59e0b" scale={0.4} />
          </Float>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Floating Icons */}
          <motion.div className="flex justify-center space-x-8 mb-8">
            <motion.div
              variants={itemVariants}
              className="text-primary animate-floating"
              style={{ animationDelay: "0s" }}
            >
              <Code size={32} />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-secondary animate-floating"
              style={{ animationDelay: "1s" }}
            >
              <Sparkles size={32} />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-accent animate-floating"
              style={{ animationDelay: "2s" }}
            >
              <Zap size={32} />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
              Computer Science Engineer & Cyber Security Enthusiast
            </h1>
            <div className="text-2xl md:text-3xl text-muted-foreground mb-6">
              Building digital experiences with{" "}
              <span className="text-primary">passion</span> and{" "}
              <span className="text-secondary">precision</span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I craft resilient AI-driven solutions at the intersection of Cybersecurity and Machine Learning—combining problem-solving,
            cloud security, and ethical hacking to defend against evolving threats.
          </motion.p>



          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="text-muted-foreground mb-2">Scroll to explore</div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-primary"
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;