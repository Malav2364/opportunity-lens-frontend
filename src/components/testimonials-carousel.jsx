"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Data Scientist at TechFlow",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
    quote:
      "The clarity I got from Opportunity Lens is unmatched. It didn't just show me data charts, it showed me a clear career path I couldn't see before.",
  },
  {
    name: "Priya Kapoor",
    role: "CS Graduate Student",
    initials: "PK",
    color: "bg-purple-100 text-purple-700",
    quote:
      "I was drowning in tutorials. This tool helped me focus on the 20% of skills that give 80% of the results. I finally feel like I'm making progress.",
  },
  {
    name: "James Ross",
    role: "Engineering Lead",
    initials: "JR",
    color: "bg-green-100 text-green-700",
    quote:
      "Our team uses it to align on skill gaps. It's become essential for our quarterly learning goals and keeping everyone on the same page.",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    initials: "SC",
    color: "bg-orange-100 text-orange-700",
    quote:
      "Finally, a tool that helps me understand the technical constraints my team faces. It's bridged the gap between product and engineering.",
  },
  {
    name: "Michael Torres",
    role: "Junior Developer",
    initials: "MT",
    color: "bg-indigo-100 text-indigo-700",
    quote:
      "The roadmap feature is a lifesaver. I know exactly what to learn next to level up my career. Highly recommended for new devs.",
  },
  {
    name: "Emily Watson",
    role: "Data Analyst",
    initials: "EW",
    color: "bg-pink-100 text-pink-700",
    quote:
      "The visualizations are top notch. I can easily spot trends and outliers in my data. It's made my job so much easier.",
  },
];

export function TestimonialsCarousel() {
  const scrollContainerRef = useRef(null);

  const scrollByCard = (direction) => {
    scrollContainerRef.current?.scrollBy({
      left: direction * 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="min-w-[300px] md:min-w-[calc(33.333%-1.5rem)] snap-center"
          >
            <Card className="p-8 border-none shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 fill-blue-500 text-blue-500"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                &quot;{item.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={item.color}>
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(-1)}
          className="rounded-full"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(1)}
          className="rounded-full"
          aria-label="Next testimonials"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
