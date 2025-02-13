"use client"
import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Footer: React.FC = () => {
  const email = "puppin.pedro@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!");
    } catch (error) {
      console.error("Error copying email:", error);
      toast.error("Failed to copy email.");
    }
  };

  return (
    <footer className="mt-auto w-full p-4 bg-transparent flex justify-end items-center space-x-6">
      <p className="text-sm font-medium text-muted-foreground">
        Let's Connect!
      </p>
      <div className="flex justify-center items-center space-x-4">
        <a 
          href="https://www.linkedin.com/in/pedro-puppin" 
          target="_blank" 
          rel="noopener noreferrer"
          title="linkedin"
          className="hover:text-blue-600"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a 
          href="https://github.com/pedropuppin" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Github"
          className="hover:text-gray-600"
        >
          <Github className="w-6 h-6" />
        </a>
        <Button variant="ghost" size="icon" onClick={handleCopyEmail} className="p-1">
          <Mail className="w-6 h-6 hover:text-red-500" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
