import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GlassCard from "../ui/glass-card";
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
    <section className="py-20 md:py-32 relative overflow-hidden" id="prelaunch">
      <div className="container mx-auto px-4">
        <GlassCard className="max-w-4xl mx-auto p-8 md:p-12 relative z-10 overflow-hidden">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">Exclusive Pre-Launch Access</h2>
            <p className="font-cormorant text-lg text-frozo-gray-light">
              Sign up to receive 10% off your first purchase and early access to our newest collections.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your email address"
                            className="bg-transparent border border-frozo-gray-medium p-3 font-montserrat text-sm focus:outline-none focus:border-white transition-all"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black font-montserrat uppercase tracking-widest text-sm py-3 px-6 hover:bg-opacity-90 transition-all"
                    data-hover="true"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-frozo-gray-medium text-xs mt-4 text-center">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            </Form>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
