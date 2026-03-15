import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const noteCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const photo = photoRef.current;
    const noteCard = noteCardRef.current;

    if (!section || !card || !photo || !noteCard) return;

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
        { x: '-15vw', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        noteCard,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '10vw', rotate: 4, opacity: 0, ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="section-pinned bg-cream-paper flex items-center justify-center z-50"
    >
      <div
        ref={cardRef}
        className="card-editorial w-[92vw] md:w-[86vw] h-[72vh] md:h-[78vh] relative flex-shrink-0"
      >
        <div className="relative w-full h-full p-6 md:p-10 lg:p-12">
          {/* Left Photo */}
          <div
            ref={photoRef}
            className="absolute left-6 md:left-[6%] top-[8%] md:top-[8%] w-[90%] md:w-[40%] h-[35%] md:h-[84%] overflow-hidden"
          >
            <img
              src="/event_gathering.jpg"
              alt="People gathering at café"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Block */}
          <div className="absolute right-6 md:left-[52%] top-[45%] md:top-[10%] w-[90%] md:w-[42%]">
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-espresso leading-[0.95] tracking-tight mb-4 md:mb-6"
            >
              HOST YOUR EVENTS
            </h2>

            <div>
              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed mb-6 md:mb-8">
                Birthday drinks, team socials, beer tastings, or private hire — our space works for all of it. We handle the bar, you handle the guest list.
              </p>
              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed mb-6 md:mb-8">
                Make Brew House the backdrop for your next night out. We'll build a bespoke drinks menu, sort the snacks, and set the vibe.
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Plan an event
              </button>
            </div>
          </div>

          {/* Secondary Note Card */}
          <div
            ref={noteCardRef}
            className="card-secondary absolute right-6 md:right-[8%] bottom-[8%] md:bottom-[12%] w-[200px] md:w-[260px] p-4 md:p-5 animate-float"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-terracotta" />
              <p className="text-eyebrow text-terracotta">Private Hire</p>
            </div>
            <p className="font-body text-sm text-espresso/80">
              Drop us a line with your date and headcount — we'll sort the rest.
            </p>
            <div className="flex items-center gap-2 mt-3 text-espresso/60">
              <Mail size={14} />
              <span className="font-mono text-xs">hello@brewhousecafe.co.uk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
