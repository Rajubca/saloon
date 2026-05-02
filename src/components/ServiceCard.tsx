"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
}

export default function ServiceCard({ title, description, price, imageSrc }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary transition-colors duration-500 cursor-pointer">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-xl font-medium text-foreground">{title}</h3>
          <span className="text-primary font-semibold">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
