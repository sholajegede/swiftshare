"use client";

import { motion } from "framer-motion";
import { Upload, Share, FolderOpen } from "lucide-react";

const steps = [
  {
    title: "Upload Your Files",
    description: "Effortlessly upload files of any size to our secure servers.",
    icon: Upload,
  },
  {
    title: "Share Instantly",
    description: "Generate shareable links with customizable permissions in seconds.",
    icon: Share,
  },
  {
    title: "Manage and Organize",
    description: "Keep your files organized with intuitive folder structures and powerful search.",
    icon: FolderOpen,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simplified in 3 Easy Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started with SwiftShare in minutes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-blue-200 dark:bg-blue-800 -translate-y-1/2 transform translate-x-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}