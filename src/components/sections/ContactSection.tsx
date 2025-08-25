import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "karthickarrul2005@gmail.com",
      link: "mailto:karthickarrul2005@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8220096356",
      link: "tel:+918220096356",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Tiruppur, Tamilnadu",
      link: "https://www.google.com/maps/place/Tiruppur,+Tamil+Nadu/@11.108571,77.2814111,12z/data=!3m1!4b1!4m6!3m5!1s0x3ba907b0424d75b9:0x4750551698a91687!8m2!3d11.1085242!4d77.3410656!16zL20vMDVwZHpq?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
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
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background-tertiary via-background-secondary to-background opacity-90" />
      
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
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new
              projects and collaborate with amazing people.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Whether you have a project in mind, want to discuss opportunities,
                  or just want to say hello, I'd love to hear from you. Let's create
                  something amazing together.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    variants={itemVariants}
                    className="glass-card p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:animate-glow-pulse">
                      <info.icon size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Response Promise
              <motion.div
                variants={itemVariants}
                className="glass-card p-6 border-l-4 border-primary"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  Quick Response Guarantee
                </h4>
                <p className="text-muted-foreground">
                  I typically respond to all inquiries within 24 hours. For urgent
                  matters, feel free to call directly.
                </p>
              </motion.div> */}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Send a Message
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <GlowButton type="submit" variant="hero" className="w-full">
                  <Send size={20} className="mr-2" />
                  Send Message
                </GlowButton>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;