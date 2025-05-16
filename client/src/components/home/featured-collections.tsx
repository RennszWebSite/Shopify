import { motion } from "framer-motion";
import { Link } from "wouter";
import GlassCard from "../ui/glass-card";

const collections = [
  {
    id: 1,
    title: "Monochrome Collection",
    description: "Essential pieces in timeless black and white",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Shadow Play Collection",
    description: "Artful textures with dramatic contrasts",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Architectural Silhouettes",
    description: "Urban designs with structural precision",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
    link: "#"
  }
];

const FeaturedCollections = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative" id="collections">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Featured Collections</h2>
          <p className="font-cormorant text-lg text-frozo-gray-light max-w-xl mx-auto">
            Explore our curated collections of premium streetwear designed for the modern connoisseur.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collections.map((collection) => (
            <motion.div 
              key={collection.id} 
              variants={itemVariants}
              className="group"
            >
              <GlassCard 
                className="overflow-hidden group"
                dataHover={true}
                animate={false}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 gradient-overlay opacity-50"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl mb-2">{collection.title}</h3>
                  <p className="font-cormorant text-frozo-gray-medium mb-4">{collection.description}</p>
                  <a href={collection.link} className="font-montserrat uppercase text-xs tracking-wider inline-flex items-center group">
                    <span className="mr-2">Explore Collection</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </a>
                </div>
              </GlassCard>
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
            View All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
