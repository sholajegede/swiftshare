import { Card, CardContent } from "@/components/ui/card";
import { Users, FileUp, Globe } from "lucide-react";

const stats = [
  {
    name: "Active Users",
    value: "100K+",
    icon: Users,
    description: "Trust our platform",
  },
  {
    name: "Files Shared",
    value: "10M+",
    icon: FileUp,
    description: "Securely transferred",
  },
  {
    name: "Countries",
    value: "150+",
    icon: Globe,
    description: "Global presence",
  },
];

export function Stats() {
  return (
    <div className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by users worldwide
          </h2>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center gap-x-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <dt className="text-sm font-semibold leading-6">{stat.name}</dt>
                </div>
                <dd className="mt-4">
                  <span className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </dd>
              </CardContent>
            </Card>
          ))}
        </dl>
      </div>
    </div>
  );
}