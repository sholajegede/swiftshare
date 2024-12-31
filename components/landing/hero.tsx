"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Upload, Download, Share2, Cloud } from "lucide-react";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const floatingIcons = [Upload, Download, Share2, Cloud];

const generateInitialPositions = () =>
  floatingIcons.map(() => ({
    top: 0,
    left: 0,
  }));

export function Hero() {
  const { isAuthenticated, user } = useKindeBrowserClient();

  const [iconPositions, setIconPositions] = useState(generateInitialPositions);

  useEffect(() => {
    setIconPositions(
      floatingIcons.map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Background Icons */}
        {iconPositions.map((position, index) => {
          const Icon = floatingIcons[index];
          return (
            <motion.div
              key={index}
              className="absolute opacity-10"
              initial={{ top: `${position.top}%`, left: `${position.left}%` }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <Icon className="w-12 h-12" />
            </motion.div>
          );
        })}

        <div className="text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Swift and Secure File Sharing
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              for Everyone
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Easily upload, organize, and share files with SwiftShare. Reliable,
            fast, and accessible anytime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started Free
                </Button>
              </Link>
            ) : (
              <RegisterLink>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started Free
                </Button>
              </RegisterLink>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required
            </p>
          </motion.div>

          {/* Demo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl m-4">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Drag and drop your files here or click to browse
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};