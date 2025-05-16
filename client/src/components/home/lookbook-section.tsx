import { motion } from "framer-motion";
import { Link } from "wouter";

const lookbookImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    number: "01",
    className: "h-96"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    number: "02",
    className: "h-96"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    number: "03",
    className: "h-96"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1200&q=80",
    number: "04",
    className: "h-[500px]"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1200&q=80",
    number: "05",
    className: "h-[500px]"
  }
];

const LookbookSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="py-20 md:py-32 relative" id="lookbook">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">LOOKBOOK</h2>
          <p className="font-cormorant text-lg text-frozo-gray-light max-w-xl mx-auto">
            Explore our latest collection through cinematic visuals.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {lookbookImages.slice(0, 3).map((image) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden group ${image.className}`}
              variants={itemVariants}
              data-hover="true"
            >
              <img 
                src={image.src} 
                alt={`Lookbook Image ${image.number}`} 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-cormorant text-2xl tracking-wider">{image.number}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {lookbookImages.slice(3, 5).map((image) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden group ${image.className}`}
              variants={itemVariants}
              data-hover="true"
            >
              <img 
                src={image.src} 
                alt={`Lookbook Image ${image.number}`} 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-cormorant text-2xl tracking-wider">{image.number}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="#" 
            className="inline-block glass-card px-10 py-4 font-montserrat uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-500"
            data-hover="true"
          >
            View Full Lookbook
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LookbookSection;
