import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const photo = photoRef.current;

    if (!section || !card || !photo) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=20%',
          pin: true,
          scrub: 0.5,
        },
      });

      // Parallax
      scrollTl.fromTo(photo, { y: -6 }, { y: 6, ease: 'none' }, 0);

      // Exit
      scrollTl.fromTo(
        card,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '-25vw', rotate: -3, opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        photo,
        { x: 0, opacity: 1 },
        { x: '15vw', opacity: 0, ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-cream-paper flex items-center justify-center z-[60]"
    >
      <div
        ref={cardRef}
        className="card-editorial w-[92vw] md:w-[86vw] h-[72vh] md:h-[78vh] relative flex-shrink-0"
      >
        <div className="relative w-full h-full p-6 md:p-10 lg:p-12">
          <div className="absolute left-6 md:left-[6%] top-[8%] md:top-[10%] w-[90%] md:w-[44%]">
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-espresso leading-[0.95] tracking-tight mb-4 md:mb-6"
            >
              ABOUT US
            </h2>

            <div>
              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed mb-6 md:mb-8">
                We're a neighbourhood café that doesn't stop at coffee. Open from 7am for your morning brew, then cold pints and bar snacks from noon — no awkward transition, just one good place to be.
              </p>
              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed mb-6 md:mb-8">
                BREW HOUSE was started by two mates who couldn't find a spot that did both well. So they built one. Dog-friendly, laptop-tolerant, and always worth the trip.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Get in touch
              </button>
            </div>
          </div>

          <div
            className="absolute left-[15%] md:left-[6%] top-[38%] md:top-[62%] w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-espresso/30 flex items-center justify-center text-espresso/50 animate-float"
          >
            <Heart size={20} />
          </div>

          <div
            ref={photoRef}
            className="absolute right-6 md:right-[6%] top-[42%] md:top-[8%] w-[90%] md:w-[40%] h-[35%] md:h-[84%] overflow-hidden"
          >
            <img
              src="/team_counter.jpg"
              alt="Coffee Matters team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
