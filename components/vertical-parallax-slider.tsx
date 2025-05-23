"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

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

const captions = [
  "CleverB - Bangalore",
  "Creative Resort Web Design",
  "Education Website Design",
  "Evercool - Dubai",
  "Grandhouse",
  "Gurkha Restaurant UK",
  "Integral HR Company Web Design",
  "Motville Holiday Villa",
  "Pharma Web Design",
  "Wayanad Resort",
];

export function VerticalParallaxSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // GSAP ScrollTrigger setup
    const slides = slideRefs.current;
    const container = containerRef.current;
    if (!container || slides.length === 0) return;

    // Initialize GSAP animations for each slide
    slides.forEach((slide, idx) => {
      if (!slide) return;

      // Set initial state
      gsap.set(slide, {
        opacity: idx === 0 ? 1 : 0,
        scale: idx === 0 ? 1 : 0.9,
        y: idx === 0 ? 0 : 100,
        rotateX: idx === 0 ? 0 : 5,
        zIndex: idx,
      });

      // Create ScrollTrigger for each slide
      ScrollTrigger.create({
        trigger: slide,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setActiveIndex(idx);

          // Parallax effect with rotation and scale
          gsap.to(slide, {
            y: (1 - progress) * 100,
            scale: 0.9 + 0.1 * progress,
            rotateX: (1 - progress) * 5,
            opacity: progress,
            duration: 0.5,
            ease: "power2.out",
          });

          // Fade out previous slide
          if (idx > 0 && slides[idx - 1]) {
            gsap.to(slides[idx - 1], {
              opacity: 1 - progress,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Update progress bar
          if (progressBarRef.current && idx === slides.length - 1) {
            gsap.to(progressBarRef.current, {
              scaleX: progress,
              duration: 0.2,
              ease: "none",
            });
          }
        },
      });
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Navigation dot click handler
  const handleDotClick = (idx: number) => {
    const slide = slideRefs.current[idx];
    if (slide) {
      const slideRect = slide.getBoundingClientRect();
      const scrollTo = window.scrollY + slideRect.top - window.innerHeight * 0.1;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && activeIndex < images.length - 1) {
        handleDotClick(activeIndex + 1);
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        handleDotClick(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section
      id="web-design-samples"
      className="relative w-full py-20 bg-gradient-to-b from-background via-muted/50 to-background"
      aria-label="Web Design Samples Slider"
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
          style={{ height: `${images.length * 100}vh` }}
        >
          {images.map((src, idx) => (
            <div
              key={src}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="parallax-slide w-full h-[80vh] flex items-center justify-center sticky top-[10vh]"
              style={{ willChange: "transform, opacity, scale, rotateX" }}
              aria-hidden={activeIndex !== idx}
              tabIndex={activeIndex === idx ? 0 : -1}
            >
              <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden bg-background border border-primary/10 transition-all duration-500 relative">
                <Image
                  src={src}
                  alt={`Web Design Sample ${idx + 1}`}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain"
                  priority={idx === 0}
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-lg font-semibold px-6 py-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{captions[idx]}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Navigation dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-2 z-50">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-primary transition-all duration-300 ${
                  activeIndex === idx ? "bg-primary scale-125" : "bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={activeIndex === idx}
                onClick={() => handleDotClick(idx)}
                tabIndex={0}
              />
            ))}
          </div>
          {/* Progress bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-200 rounded-full z-50">
            <div
              ref={progressBarRef}
              className="h-full bg-primary rounded-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}