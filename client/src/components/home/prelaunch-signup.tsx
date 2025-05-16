import { useState } from "react";
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
        title: "Success!",
        description: "Thank you for signing up. You'll receive 10% off your first purchase.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-black" id="prelaunch">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-40 right-40 rotate-45 text-[200px] font-bold text-white opacity-5">FROZO</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-md">
              <div className="mb-8">
                <span className="inline-block bg-white text-black font-montserrat text-xs uppercase tracking-widest py-1 px-3 mb-6">
                  Early Access
                </span>
                <h2 className="text-4xl md:text-5xl font-montserrat font-bold uppercase mb-6 leading-tight">
                  Get 10% Off<br />Your First Order
                </h2>
                <div className="w-20 h-1 bg-white mb-6"></div>
                <p className="text-lg text-gray-300 mb-8">
                  Join the FROZO community now and be the first to access our exclusive drops and limited edition pieces.
                </p>
              </div>
              
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
                              placeholder="Your email address"
                              className="bg-transparent border-2 border-white py-6 px-4 font-montserrat text-base w-full focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                              disabled={isSubmitting}
                            />
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="absolute right-1.5 top-1.5 bg-white text-black font-montserrat uppercase tracking-widest text-sm py-4 px-6 hover:bg-opacity-90 transition-all"
                              data-hover="true"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span>Sending</span>
                                </div>
                              ) : (
                                <span>Sign Up</span>
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="mt-2" />
                      </FormItem>
                    )}
                  />
                  <p className="text-gray-400 text-xs">
                    By subscribing, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a> and consent to receive updates from our company.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-white opacity-10 blur rounded-lg"></div>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="Streetwear Collection Preview" 
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-1 mb-3 inline-block">Coming Soon</span>
                      <h3 className="text-2xl font-bold text-white">23 Fall Collection</h3>
                    </div>
                    <div className="text-4xl font-bold">→</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
