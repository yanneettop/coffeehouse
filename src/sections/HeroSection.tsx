import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Croissant } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const photo = photoRef.current;
    const underline = underlineRef.current;

    if (!section || !card || !photo) return;

    const ctx = gsap.context(() => {
      // Animate underline draw on load
      if (underline) {
        const length = underline.getTotalLength?.() || 280;
        gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(underline, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 });
      }

      // Scroll-driven exit only — everything starts visible
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=20%',
          pin: true,
          scrub: 0.5,
        },
      });

      // Subtle parallax on photo during scroll
      scrollTl.fromTo(photo, { y: -8 }, { y: 8, ease: 'none' }, 0);

      // Exit: card slides out to the left at 60–100% scroll
      scrollTl.fromTo(
        card,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '-25vw', rotate: -3, opacity: 0, ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-cream-paper flex items-center justify-center z-10"
    >
      {/* Card — centered via section flexbox so GSAP x/y transforms don't break centering */}
      <div
        ref={cardRef}
        className="card-editorial w-[92vw] md:w-[86vw] h-[72vh] md:h-[78vh] relative flex-shrink-0"
      >
        <div className="relative w-full h-full p-6 md:p-10 lg:p-12">
          {/* Eyebrow */}
          <p className="text-eyebrow text-espresso/70 mb-4 md:mb-6">
            Independent Café — Shoreditch
          </p>

          {/* Left Text Block */}
          <div className="absolute left-6 md:left-[6%] top-[18%] md:top-[14%] w-[90%] md:w-[44%]">
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[112px] xl:text-[140px] font-bold text-espresso leading-[0.95] tracking-tight mb-4 md:mb-6">
              BREW HOUSE
            </h1>
            {/* Gold Underline SVG */}
            <svg
              className="absolute -bottom-2 left-0 w-[200px] md:w-[280px] h-3"
              viewBox="0 0 280 12"
              fill="none"
            >
              <line
                ref={underlineRef}
                x1="0"
                y1="6"
                x2="280"
                y2="6"
                stroke="#D7A04D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <p className="font-body text-base md:text-lg text-espresso/80 mt-8 md:mt-10 leading-relaxed max-w-md">
              Craft coffee, hearty bites, and cold pints — your all-day hangout in the heart of Shoreditch.
            </p>
          </div>

          {/* Right Photo */}
          <div
            ref={photoRef}
            className="absolute right-6 md:right-[6%] top-[42%] md:top-[8%] w-[90%] md:w-[40%] h-[35%] md:h-[84%] overflow-hidden"
          >
            <img
              src="/hero_barista.jpg"
              alt="Barista preparing coffee"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CTA Buttons */}
          <div className="absolute left-6 md:left-[6%] bottom-[18%] md:bottom-[12%] flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/menu" className="btn-primary inline-block text-center">
              See the menu
            </Link>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Book a table
            </button>
          </div>

          {/* Doodles */}
          <div className="absolute left-6 md:left-[6%] bottom-[6%] md:bottom-[4%] flex gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-espresso/30 flex items-center justify-center text-espresso/50">
              <Coffee size={18} />
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-espresso/30 flex items-center justify-center text-espresso/50">
              <Croissant size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
