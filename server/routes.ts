import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import z from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = insertSubscriberSchema
        .extend({
          email: z.string().email("Please provide a valid email address"),
        })
        .parse({
          email: req.body.email,
          subscriptionType: "newsletter",
        });

      const subscriber = await storage.createSubscriber({
        email,
        subscriptionType: "newsletter",
        createdAt: new Date().toISOString(),
      });

      res.status(201).json({ success: true, subscriber });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Pre-launch signup endpoint with 10% discount
  app.post("/api/prelaunch-signup", async (req, res) => {
    try {
      const { email } = insertSubscriberSchema
        .extend({
          email: z.string().email("Please provide a valid email address"),
        })
        .parse({
          email: req.body.email,
          subscriptionType: "prelaunch",
        });

      const subscriber = await storage.createSubscriber({
        email,
        subscriptionType: "prelaunch",
        createdAt: new Date().toISOString(),
      });

      res.status(201).json({ 
        success: true, 
        subscriber,
        message: "Thank you for signing up! You'll receive 10% off your first purchase."
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        console.error("Pre-launch signup error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
