import { motion } from "framer-motion";
import GlassCard from "../ui/glass-card";

const atelierFeatures = [
  {
    id: 1,
    icon: "fas fa-gem",
    title: "Materials",
    description: "Sourced from the world's finest suppliers, our materials represent the pinnacle of quality and sustainability."
  },
  {
    id: 2,
    icon: "fas fa-hands",
    title: "Craftsmanship",
    description: "Each garment passes through the hands of skilled artisans who bring decades of expertise to every piece."
  },
  {
    id: 3,
    icon: "fas fa-pencil-ruler",
    title: "Design",
    description: "Our design philosophy merges traditional techniques with innovative approaches to create timeless yet contemporary pieces."
  }
];

const AtelierSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="atelier">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">THE ATELIER</h2>
          <p className="font-cormorant text-lg text-frozo-gray-light">
            Our commitment to excellence is reflected in every stitch, every detail, and every moment of creation. 
            Each piece is crafted with intention, precision, and reverence for the artistry of fashion.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {atelierFeatures.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <GlassCard className="p-8 text-center" animate={false}>
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-frozo-gray-medium rounded-full">
                  <i className={`${feature.icon} text-xl`}></i>
                </div>
                <h3 className="font-playfair text-xl mb-4">{feature.title}</h3>
                <p className="font-cormorant text-frozo-gray-light">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#" 
            className="inline-block font-montserrat uppercase tracking-wider text-sm border-b border-white pb-1 hover:text-frozo-gray-light hover:border-frozo-gray-light transition-all" 
            data-hover="true"
          >
            Discover Our Story
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AtelierSection;
