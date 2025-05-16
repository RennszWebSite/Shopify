import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

// Sample style questions for the recommendation quiz
const styleQuestions = [
  {
    id: 'q1',
    question: 'WHAT IS YOUR PREFERRED STYLE?',
    options: [
      { id: 'a1-1', text: 'MINIMAL & CLEAN', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a1-2', text: 'AVANT-GARDE', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a1-3', text: 'TECH-INSPIRED', image: 'https://images.unsplash.com/photo-1594032198431-700728cc5e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' }
    ]
  },
  {
    id: 'q2',
    question: 'WHICH COLOR PALETTE DO YOU PREFER?',
    options: [
      { id: 'a2-1', text: 'MONOCHROME', image: 'https://images.unsplash.com/photo-1566312548941-93354182eb60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a2-2', text: 'NEON ACCENTS', image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a2-3', text: 'EARTH TONES', image: 'https://images.unsplash.com/photo-1549645402-a9d655c5c344?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' }
    ]
  },
  {
    id: 'q3',
    question: 'WHAT STATEMENT DO YOU WANT TO MAKE?',
    options: [
      { id: 'a3-1', text: 'FUTURISTIC', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a3-2', text: 'REBELLIOUS', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' },
      { id: 'a3-3', text: 'SOPHISTICATED', image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80' }
    ]
  }
];

// Define the recommendation result type
interface StyleRecommendation {
  style: string;
  description: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}

// Define recommendations record type with string keys
type StyleRecommendations = Record<string, StyleRecommendation>;

// Sample recommendation results based on answers
const styleRecommendations: StyleRecommendations = {
  'a1-1_a2-1_a3-3': {
    style: 'MINIMALIST EXECUTIVE',
    description: 'Your style is defined by clean lines, monochromatic palettes, and sophisticated execution. Perfect for those who want to make a statement through restraint and quality materials.',
    products: [
      { id: 'p1', name: 'TECH BOMBER', price: 289, image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80' },
      { id: 'p2', name: 'TACTICAL CARGO', price: 169, image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80' }
    ]
  },
  'a1-2_a2-2_a3-2': {
    style: 'CYBERPUNK REBEL',
    description: 'Your style combines avant-garde silhouettes with neon accents and a rebellious edge. You\'re not afraid to push boundaries and create your own rules in fashion.',
    products: [
      { id: 'p3', name: 'DISORDER TEE', price: 89, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80' },
      { id: 'p4', name: 'LOOSE FIT HOODIE', price: 189, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80' }
    ]
  }
};

// Generate a recommendation key for any combination of answers
const getRecommendationKey = (answers: Record<string, string>): string => {
  const keys = Object.keys(answers).sort();
  const values = keys.map(key => answers[key]);
  const combinedKey = values.join('_');
  
  // Return a default key if the exact combination is not found
  return styleRecommendations[combinedKey] ? combinedKey : 'a1-1_a2-1_a3-3';
};

interface StyleRecommendationProps {
  className?: string;
}

const StyleRecommendation = ({ className = '' }: StyleRecommendationProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  
  const handleStartQuiz = () => {
    setIsActive(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
    
    if (currentQuestionIndex < styleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Start analyzing animation
      setAnalyzing(true);
      
      // Simulate AI processing with glitch text effect
      let count = 0;
      const glitchInterval = setInterval(() => {
        count++;
        const glitchTexts = [
          'ANALYZING STYLE PREFERENCES',
          'CROSS-REFERENCING DATABASE',
          'EVALUATING AESTHETIC COMPATIBILITY',
          'CALIBRATING RECOMMENDATIONS',
          'FINALIZING RESULTS'
        ];
        
        setGlitchText(glitchTexts[count % glitchTexts.length]);
        
        if (count > 10) {
          clearInterval(glitchInterval);
          setAnalyzing(false);
          setShowResults(true);
        }
      }, 500);
    }
  };
  
  const handleReset = () => {
    setIsActive(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const currentQuestion = styleQuestions[currentQuestionIndex];
  const recommendationKey = getRecommendationKey(answers);
  const recommendation = styleRecommendations[recommendationKey];
  
  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Main container with glass effect */}
      <div className="relative border border-white border-opacity-20 backdrop-blur-sm overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-cyan-500 to-transparent opacity-20"></div>
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10 p-8">
          {!isActive ? (
            // Initial state - quiz intro
            <div className="text-center py-12">
              <h2 className="text-5xl font-anton uppercase mb-4 tracking-tight leading-none">
                STYLE <span className="text-outline">AI</span>
              </h2>
              <div className="h-0.5 w-16 bg-white mx-auto mb-6"></div>
              <p className="text-white text-opacity-70 font-archivo mb-8 max-w-md mx-auto">
                Our AI-powered style recommendation system will analyze your preferences and create personalized suggestions that match your unique aesthetic.
              </p>
              <motion.button
                className="bg-white text-black font-bebas tracking-wider text-xl px-8 py-3 relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartQuiz}
                data-hover="true"
              >
                <span className="relative z-10">START STYLE QUIZ</span>
                <span className="absolute inset-0 w-0 bg-cyan-500 opacity-30 group-hover:w-full transition-all duration-500 -skew-x-12"></span>
              </motion.button>
            </div>
          ) : (
            // Quiz is active
            <AnimatePresence mode="wait">
              {!showResults && !analyzing && (
                // Question display
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {styleQuestions.map((_, index) => (
                        <div 
                          key={index} 
                          className={`w-3 h-3 mx-1 rounded-full ${index === currentQuestionIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                        ></div>
                      ))}
                    </div>
                    <h3 className="text-3xl font-anton tracking-tight mb-8">
                      {currentQuestion.question}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentQuestion.options.map((option) => (
                      <motion.div
                        key={option.id}
                        className="border border-white border-opacity-20 overflow-hidden cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
                        data-hover="true"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={option.image}
                            alt={option.text}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h4 className="font-bebas tracking-wider text-lg">{option.text}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {analyzing && (
                // AI analyzing animation
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-2 border-white border-opacity-20 rounded-full"></div>
                    <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
                    
                    <div className="absolute inset-4 border-2 border-white border-opacity-20 rounded-full"></div>
                    <div className="absolute inset-4 border-t-2 border-cyan-400 rounded-full animate-spin-slow"></div>
                    
                    <div className="absolute inset-8 border-2 border-white border-opacity-20 rounded-full"></div>
                    <div className="absolute inset-8 border-t-2 border-fuchsia-400 rounded-full animate-reverse-spin"></div>
                  </div>
                  
                  <h3 className="font-bebas tracking-wider text-3xl mb-4 glitch-text">
                    {glitchText}
                  </h3>
                  
                  <div className="flex justify-center space-x-2 mt-8">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </motion.div>
              )}
              
              {showResults && (
                // Results display
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="inline-block px-4 py-2 bg-white text-black font-bebas tracking-wider text-xl mb-4">
                      STYLE PROFILE RESULTS
                    </h3>
                    <h2 className="text-5xl font-anton tracking-tight mb-4">
                      {recommendation.style}
                    </h2>
                    <div className="h-0.5 w-16 bg-white mx-auto mb-6"></div>
                    <p className="text-white text-opacity-70 font-archivo mb-8 max-w-lg mx-auto">
                      {recommendation.description}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-bebas tracking-wider text-xl mb-4">RECOMMENDED FOR YOU</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendation.products.map((product: {
                        id: string;
                        name: string;
                        price: number;
                        image: string;
                      }) => (
                        <Link 
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="group block border border-white border-opacity-20 overflow-hidden"
                          data-hover="true"
                        >
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bebas tracking-wider text-lg">{product.name}</h4>
                                <span className="font-bebas">${product.price}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <motion.button
                      className="bg-white text-black font-bebas tracking-wider px-6 py-2 relative overflow-hidden group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      data-hover="true"
                    >
                      <span className="relative z-10">RETAKE QUIZ</span>
                      <span className="absolute inset-0 w-0 bg-cyan-500 opacity-30 group-hover:w-full transition-all duration-500 -skew-x-12"></span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleRecommendation;