import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const PrelaunchSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textEffect, setTextEffect] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/prelaunch-signup", data);
      toast({
        title: "SUBSCRIBED!",
        description: "You're in! 10% OFF code will be sent to your email.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "FAILED",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Text distortion effect
  useEffect(() => {
    const originalText = "JOIN US";
    
    const distortInterval = setInterval(() => {
      const shouldDistort = Math.random() < 0.3;
      
      if (shouldDistort) {
        let distortedText = '';
        
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3) {
            // Random ASCII characters
            const possibleChars = "@#%&*_-=+][";
            distortedText += possibleChars[Math.floor(Math.random() * possibleChars.length)];
          } else {
            distortedText += originalText[i];
          }
        }
        
        setTextEffect(distortedText);
        
        // Reset text after a short delay
        setTimeout(() => {
          setTextEffect(originalText);
        }, 100);
      }
    }, 2000);
    
    setTextEffect(originalText);
    
    return () => clearInterval(distortInterval);
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden distorted-bg border-t border-b border-white border-opacity-10" id="prelaunch">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white to-transparent opacity-[0.01]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white bg-opacity-[0.01] blur-3xl"></div>
        <div className="hidden md:block absolute bottom-0 right-0 w-full h-1/2 overflow-hidden">
          <div className="w-full h-full relative">
            <div className="absolute -right-20 bottom-0 text-[300px] font-anton text-white opacity-[0.02] leading-none">
              FROZO
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left info column */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md">
              <div className="mb-8">
                <div className="inline-block border border-white border-opacity-30 px-3 py-1 mb-4 font-bebas text-sm tracking-wider text-white text-opacity-70">
                  INSIDER ACCESS
                </div>
                <h2 className="text-7xl font-anton uppercase mb-4 tracking-tight leading-none">
                  <span className="block">EARLY</span>
                  <span className="block text-outline">ACCESS</span>
                </h2>
                <div className="h-0.5 w-20 bg-white mb-6"></div>
                <p className="text-base text-white text-opacity-60 font-archivo mb-8">
                  Sign up to receive 10% off your first order and get notified about drops, exclusive offers, and limited edition releases before anyone else.
                </p>
                
                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5 border border-white border-opacity-30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-sm font-archivo text-white text-opacity-80">Early access to new drops</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5 border border-white border-opacity-30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-sm font-archivo text-white text-opacity-80">Exclusive members-only offers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5 border border-white border-opacity-30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-sm font-archivo text-white text-opacity-80">Limited-edition collection announcements</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Center image */}
          <motion.div 
            className="md:col-span-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full flex items-center">
              <div className="absolute -inset-2 bg-white opacity-[0.03] blur-md rounded-full"></div>
              <div className="w-full aspect-square relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1612794531211-338efe4988b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="FROZO Collection Teaser" 
                  className="w-full h-full object-cover mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-white border-opacity-20"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Right form column */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-md ml-auto">
              <div className="absolute -inset-4 bg-white opacity-[0.01] blur-lg"></div>
              
              <div className="relative border border-white border-opacity-20 p-6 md:p-8">
                <h3 className="font-anton text-3xl mb-4 glitch-text tracking-tight">
                  {textEffect}
                </h3>
                
                <p className="text-sm text-white text-opacity-70 font-archivo mb-6">
                  Be part of the movement. Subscribe to our newsletter and receive 10% off your first order.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="EMAIL ADDRESS"
                                className="bg-transparent border-2 border-white border-opacity-20 py-6 px-4 font-bebas tracking-wider text-lg w-full focus:outline-none focus:border-white focus:border-opacity-100 transition-all placeholder:text-white placeholder:text-opacity-40"
                                disabled={isSubmitting}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-2 font-bebas" />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-white text-black font-bebas tracking-wider text-xl w-full py-3 hover:bg-opacity-90 transition-all relative overflow-hidden group"
                      data-hover="true"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "SUBMITTING..." : "SIGN UP FOR 10% OFF"}
                      </span>
                      <span className="absolute inset-0 w-0 bg-black group-hover:w-full transition-all duration-500 -skew-x-12"></span>
                      <span className="absolute inset-0 w-0 bg-white opacity-20 group-hover:w-full transition-all duration-300 delay-100 -skew-x-12"></span>
                    </Button>
                    
                    <p className="text-white text-opacity-50 text-xs font-archivo">
                      By subscribing, you agree to our <a href="#" className="underline hover:text-opacity-100 transition-colors" data-hover="true">Privacy Policy</a> and consent to receive updates from FROZO.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
