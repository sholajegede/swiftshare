import {
  Shield,
  Zap,
  Share2,
  FileText,
  Cloud,
  Lock
} from "lucide-react";

const features = [
  {
    name: "Lightning Fast",
    description: "Upload and share files in seconds with our optimized infrastructure.",
    icon: Zap,
  },
  {
    name: "End-to-End Encryption",
    description: "Your files are encrypted before they leave your device.",
    icon: Shield,
  },
  {
    name: "Easy Sharing",
    description: "Share files with a simple link or directly to email addresses.",
    icon: Share2,
  },
  {
    name: "File Preview",
    description: "Preview documents, images, and videos directly in the browser.",
    icon: FileText,
  },
  {
    name: "Cloud Storage",
    description: "Access your files from anywhere with secure cloud storage.",
    icon: Cloud,
  },
  {
    name: "Access Control",
    description: "Set passwords and expiration dates for shared files.",
    icon: Lock,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to share files securely
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built with security and ease of use in mind, FileShare provides all the features
            you need for secure file sharing.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}