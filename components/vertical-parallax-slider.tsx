"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cloud,
  Laptop,
  Mail,
  MapPin,
  Phone,
  Zap,
  BarChart3,
  BookOpen,
  Star,
  Smartphone,
} from "lucide-react"


const images = [
  "/images/slide/cleverb-bangalore.jpg",
  "/images/slide/creative-resort-web-design.jpg",
  "/images/slide/education-website-design.jpg",
  "/images/slide/evercool-dubai.jpg",
  "/images/slide/grandhouse.jpg",
  "/images/slide/gurkha-restaurant-uk.jpg",
  "/images/slide/integral-hr-company-web-design.jpg",
  "/images/slide/motville-holiday-villa.jpg",
  "/images/slide/pharma-web-design.jpg",
  "/images/slide/wayanad-resort.jpg",
];

export function VerticalParallaxSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;

      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;

        const slideRect = slide.getBoundingClientRect();
        const slideTop = slideRect.top + window.scrollY;
        const slideHeight = slideRect.height;

        // Calculate the scroll progress for this slide
        const scrollPosition = window.scrollY + viewportHeight / 2;
        const start = containerTop + idx * slideHeight;
        const end = start + slideHeight;
        const progress = Math.min(Math.max((scrollPosition - start) / (end - start), 0), 1);

        // Apply the sliding effect
        if (idx === 0) {
          // First slide: always visible initially, no translation
          slide.style.transform = `translateY(0)`;
          slide.style.opacity = '1';
        } else {
          // Subsequent slides: slide in from the bottom
          const translateY = (1 - progress) * slideHeight;
          slide.style.transform = `translateY(${translateY}px)`;
          slide.style.opacity = progress.toString();

          // Ensure the previous slide stays visible until fully covered
          const prevSlide = slideRefs.current[idx - 1];
          if (prevSlide) {
            prevSlide.style.opacity = (1 - progress).toString();
          }
        }

        // Ensure the slide is sticky when in view
        slide.style.position = "sticky";
        slide.style.top = "10vh";
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="web-design-samples"
      className="relative w-full py-20 bg-gradient-to-b from-background via-muted/50 to-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-2">
            <Star className="mr-1 h-3.5 w-3.5" />
            <span>Our Web Design Samples</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-2">
            Stunning <span className="text-primary">Web Design</span> Projects
          </h2>
          <p className="max-w-2xl text-muted-foreground md:text-xl">
            Explore some of our best web design works, crafted for diverse industries and clients.
          </p>
        </div>
        <div
          ref={containerRef}
          className="relative mx-auto max-w-4xl"
          style={{ height: `${images.length * 100}vh` }} // Ensure enough scrolling space
        >
          {images.map((src, idx) => (
            <div
              key={src}
              ref={(el) => { slideRefs.current[idx] = el; }}
              className="parallax-slide w-full h-[80vh] flex items-center justify-center"
              style={{ willChange: "transform, opacity", zIndex: idx }}
            >
              <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden bg-background border border-primary/10 transition-all duration-500">
                <Image
                  src={src}
                  alt={`Web Design Sample ${idx + 1}`}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}