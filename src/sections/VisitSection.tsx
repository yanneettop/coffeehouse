import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const map = mapRef.current;

    if (!section || !card || !map) return;

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
      scrollTl.fromTo(map, { y: -6 }, { y: 6, ease: 'none' }, 0);

      // Exit
      scrollTl.fromTo(
        card,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '-25vw', rotate: -3, opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        map,
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
      id="visit"
      className="section-pinned bg-cream-paper flex items-center justify-center z-[70]"
    >
      <div
        ref={cardRef}
        className="card-editorial w-[92vw] md:w-[86vw] h-[72vh] md:h-[78vh] relative flex-shrink-0"
      >
        <div className="relative w-full h-full p-6 md:p-10 lg:p-12">
          <div className="absolute left-6 md:left-[6%] top-[8%] md:top-[10%] w-[90%] md:w-[40%]">
            <h2
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-espresso leading-[0.95] tracking-tight mb-4 md:mb-6"
            >
              VISIT US
            </h2>

            <div>
              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed mb-6 md:mb-8">
                We're right in the middle of Shoreditch. Walk in, grab a stool, stay as long as you like.
              </p>

              <div className="space-y-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm md:text-base text-espresso">
                      42 Curtain Road
                    </p>
                    <p className="font-body text-sm md:text-base text-espresso/70">
                      London EC2A 3AT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm md:text-base text-espresso">
                      Mon–Fri: 7am–11pm
                    </p>
                    <p className="font-body text-sm md:text-base text-espresso/70">
                      Sat–Sun: 9am–11pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm md:text-base text-espresso">
                    hello@brewhousecafe.co.uk
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.open('https://maps.google.com/?q=42+Curtain+Road+London+EC2A+3AT', '_blank')}
                className="btn-primary"
              >
                Get directions
              </button>
            </div>
          </div>

          <div
            ref={mapRef}
            className="absolute right-6 md:right-[6%] top-[50%] md:top-[8%] w-[90%] md:w-[44%] h-[30%] md:h-[84%] overflow-hidden border-2 border-espresso"
          >
            <img
              src="/map_area.jpg"
              alt="Map of Shoreditch area"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
