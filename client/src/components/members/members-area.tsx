import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import gsap from 'gsap';

interface MembersAreaProps {
  className?: string;
  isLoggedIn?: boolean;
}

const MembersArea = ({ 
  className = "",
  isLoggedIn = false // This would come from your auth context in a real app
}: MembersAreaProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'exclusives' | 'early-access' | 'settings'>('exclusives');
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Trigger glitch effect on tab change
  useEffect(() => {
    setGlitchEffect(true);
    const timer = setTimeout(() => setGlitchEffect(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Initialize GSAP animations when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Animate grid lines and background elements
    gsap.fromTo(
      container.querySelectorAll('.members-grid-line'),
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 1.2, 
        stagger: 0.08,
        ease: 'power3.out'
      }
    );
    
    gsap.fromTo(
      container.querySelectorAll('.members-bg-element'),
      { opacity: 0 },
      { 
        opacity: 0.2, 
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.inOut'
      }
    );
    
    // Animate text reveal
    gsap.fromTo(
      container.querySelectorAll('.members-text-reveal'),
      { 
        y: 20,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4
      }
    );
  }, [isExpanded]);

  // Sample exclusive drops data
  const exclusiveDrops = [
    {
      id: 'ed1',
      name: 'CYBER NIGHT COLLECTION',
      releaseDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      image: 'https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      discount: 25
    },
    {
      id: 'ed2',
      name: 'NEON DREAMS JACKET',
      releaseDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      discount: 15
    }
  ];

  // Format date to readable string
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (!isLoggedIn) {
    return (
      <div className={`${className} relative overflow-hidden border border-white border-opacity-20`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-cyan-500 to-transparent opacity-10"></div>
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        <div className="p-8 text-center relative z-10">
          <h2 className="text-4xl font-anton uppercase mb-3 tracking-tight">
            MEMBERS ONLY
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto mb-6"></div>
          <p className="font-archivo text-white text-opacity-70 mb-6 max-w-md mx-auto">
            Log in to access exclusive drops, early releases, members-only discounts, and custom style recommendations.
          </p>
          <Link 
            href="/api/login" 
            className="inline-block bg-white text-black font-bebas tracking-wider px-6 py-2 hover:bg-opacity-90 transition-all" 
            data-hover="true"
          >
            LOG IN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      className={`${className} relative border border-white border-opacity-20 overflow-hidden`}
      initial={{ height: isExpanded ? 'auto' : '180px' }}
      animate={{ height: isExpanded ? 'auto' : '180px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 -right-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-5 members-bg-element"
        ></div>
        <div 
          className="absolute bottom-0 -left-20 w-80 h-80 bg-fuchsia-500 rounded-full blur-3xl opacity-5 members-bg-element"
        ></div>
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Members area header */}
      <div 
        className={`p-6 relative z-10 flex justify-between items-center border-b border-white border-opacity-10 ${isExpanded ? 'bg-black bg-opacity-40' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
        data-hover="true"
      >
        <div className="flex items-center members-text-reveal">
          <div className="w-8 h-8 border-2 border-white mr-3 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bebas tracking-wider text-xl">MEMBERS AREA</h3>
            <p className="text-xs text-white text-opacity-50 font-archivo">Exclusive Access Granted</p>
          </div>
        </div>
        
        <div className="flex items-center members-text-reveal">
          {/* Premium badge */}
          <div className="mr-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-2 py-0.5 text-xs font-bebas tracking-wider text-white">
            PREMIUM
          </div>
          
          {/* Toggle button */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Members area content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 relative z-10"
          >
            {/* Grid lines */}
            <div className="absolute left-0 right-0 top-24 h-px bg-white bg-opacity-10 transform origin-left members-grid-line"></div>
            <div className="absolute left-0 right-0 top-48 h-px bg-white bg-opacity-10 transform origin-left members-grid-line"></div>
            <div className="absolute left-0 right-0 bottom-24 h-px bg-white bg-opacity-10 transform origin-left members-grid-line"></div>
            
            {/* Tab navigation */}
            <div className="flex border-b border-white border-opacity-10 mb-6 members-text-reveal">
              <button 
                className={`px-4 py-2 font-bebas tracking-wider text-lg ${activeTab === 'exclusives' ? 'text-white' : 'text-white text-opacity-50'}`}
                onClick={() => setActiveTab('exclusives')}
                data-hover="true"
              >
                EXCLUSIVE DROPS
              </button>
              <button 
                className={`px-4 py-2 font-bebas tracking-wider text-lg ${activeTab === 'early-access' ? 'text-white' : 'text-white text-opacity-50'}`}
                onClick={() => setActiveTab('early-access')}
                data-hover="true"
              >
                EARLY ACCESS
              </button>
              <button 
                className={`px-4 py-2 font-bebas tracking-wider text-lg ${activeTab === 'settings' ? 'text-white' : 'text-white text-opacity-50'}`}
                onClick={() => setActiveTab('settings')}
                data-hover="true"
              >
                SETTINGS
              </button>
            </div>
            
            {/* Tab content */}
            <motion.div 
              className={`relative ${glitchEffect ? 'glitch-element' : ''}`}
              style={{ 
                transform: glitchEffect ? `translateX(${Math.random() * 6 - 3}px)` : 'none',
                filter: glitchEffect ? 'brightness(1.2)' : 'none'
              }}
            >
              {activeTab === 'exclusives' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 members-text-reveal">
                  {exclusiveDrops.map(drop => (
                    <motion.div 
                      key={drop.id}
                      className="border border-white border-opacity-10 overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <img 
                          src={drop.image}
                          alt={drop.name}
                          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 text-black text-xs font-bebas">
                          {drop.discount}% OFF
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bebas tracking-wider text-lg mb-1">{drop.name}</h4>
                        <p className="text-sm text-white text-opacity-60 font-archivo">
                          Releasing: {formatDate(drop.releaseDate)}
                        </p>
                        <button 
                          className="mt-3 w-full bg-white text-black py-2 font-bebas tracking-wider text-sm"
                          data-hover="true"
                        >
                          NOTIFY ME
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'early-access' && (
                <div className="members-text-reveal">
                  <div className="text-center p-8 border border-white border-opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-white text-opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-bebas tracking-wider text-xl mb-2">EARLY ACCESS STARTS SOON</h3>
                    <p className="font-archivo text-white text-opacity-60 max-w-md mx-auto">
                      The next collection will be available for early access in 3 days. Premium members will get first access to limited edition pieces before they sell out.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="members-text-reveal">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bebas tracking-wider text-lg">ACCOUNT SETTINGS</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center font-archivo text-sm">
                          <span>Email Notifications</span>
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              id="email-notifications" 
                              className="sr-only" 
                              defaultChecked 
                            />
                            <label 
                              htmlFor="email-notifications" 
                              className="block w-12 h-6 rounded-full bg-white bg-opacity-30 cursor-pointer"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-between items-center font-archivo text-sm">
                          <span>SMS Notifications</span>
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              id="sms-notifications" 
                              className="sr-only" 
                            />
                            <label 
                              htmlFor="sms-notifications" 
                              className="block w-12 h-6 rounded-full bg-white bg-opacity-10 cursor-pointer"
                            >
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-bebas tracking-wider text-lg">MEMBERSHIP STATUS</h3>
                      <div className="p-4 border border-white border-opacity-10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-archivo text-sm">Current Plan</span>
                          <span className="font-bebas bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-2 py-0.5 text-xs">PREMIUM</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="font-archivo text-white text-opacity-60">Renewal Date</span>
                          <span>January 15, 2026</span>
                        </div>
                        <button 
                          className="mt-3 w-full bg-white text-black py-2 font-bebas tracking-wider text-sm"
                          data-hover="true"
                        >
                          MANAGE MEMBERSHIP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MembersArea;