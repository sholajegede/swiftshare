import { motion } from "framer-motion";
import {
  Zap,
  Cloud,
  Users,
  Globe,
  Settings,
  Download,
  Building2,
  MousePointerClick,
} from "lucide-react";

const features = [
  {
    title: "Fast and Secure Sharing",
    description:
      "Experience unparalleled speed with end-to-end encryption for secure file transfers.",
    icon: Zap,
    color: "bg-yellow-500/90",
    size: "lg",
  },
  {
    title: "Access Anywhere",
    description:
      "Access your files from any device with our multi-platform support.",
    icon: Globe,
    color: "bg-purple-500/90",
    size: "md",
  },
  {
    title: "Drag-and-Drop",
    description:
      "Upload files with a drag-and-drop interface designed for simplicity.",
    icon: MousePointerClick,
    color: "bg-orange-500/90",
    size: "md",
  },
  {
    title: "Offline Access",
    description:
      "Download files for offline access and never lose productivity.",
    icon: Download,
    color: "bg-indigo-500/90",
    size: "md",
  },
  {
    title: "Customizable Permissions",
    description:
      "Control who sees and edits your files with advanced permission settings.",
    icon: Settings,
    color: "bg-red-500/90",
    size: "md",
  },
  {
    title: "Accessible Storage",
    description:
      "Store all types of files, tailored for personal and business needs.",
    icon: Cloud,
    color: "bg-blue-500",
    size: "lg",
  },
];

const getSizeClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "col-span-1 row-span-1";
    case "md":
      return "col-span-1 row-span-2";
    case "lg":
      return "col-span-2 row-span-2";
    default:
      return "col-span-1 row-span-1";
  }
};

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
            Why SwiftShare Stands Out
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Powerful features designed for modern file sharing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${getSizeClasses(
                feature.size
              )} group relative overflow-hidden rounded-3xl p-8 
                bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300
                border border-gray-200 dark:border-gray-700`}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div
                  className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 
                  group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-2 
                  group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed
                  group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300"
                >
                  {feature.description}
                </p>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};