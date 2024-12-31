"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Share2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">SwiftShare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Swift and secure file sharing for everyone. Upload, share, and
              collaborate with ease.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email to stay updated"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "FAQ", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>

            <div className="mt-8">
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Facebook, label: "Facebook" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SwiftShare. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}