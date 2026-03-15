import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Instagram, Coffee, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const contact = contactRef.current;
    const footer = footerRef.current;

    if (!section || !heading || !form || !contact || !footer) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Form column
      gsap.fromTo(
        form.children,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Contact column
      gsap.fromTo(
        contact,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contact,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Footer
      gsap.fromTo(
        footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-terracotta z-[80]"
    >
      {/* Paper grain overlay */}
      <div className="paper-grain opacity-[0.03]" />

      <div className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream-paper leading-[0.95] tracking-tight mb-4">
            COME SAY HELLO
          </h2>
          <p className="font-body text-base md:text-lg text-cream-paper/80 max-w-lg">
            Book a table, enquire about events, or just drop us a note.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Form Column */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-2 border-cream-paper/30 text-cream-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-cream-paper transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-2 border-cream-paper/30 text-cream-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-cream-paper transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-transparent border-2 border-cream-paper/30 text-cream-paper px-4 py-3 font-body text-sm focus:outline-none focus:border-cream-paper transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-cream-paper text-espresso px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-warm-gold hover:text-espresso transition-colors duration-300 flex items-center gap-2"
            >
              {submitted ? (
                <>Message sent!</>
              ) : (
                <>
                  Send message
                  <Send size={14} />
                </>
              )}
            </button>
          </form>

          {/* Contact Info Column */}
          <div ref={contactRef} className="space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-4">
                Visit Us
              </h3>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-warm-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-base text-cream-paper">
                    42 Curtain Road
                  </p>
                  <p className="font-body text-base text-cream-paper/70">
                    London EC2A 3AT
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-warm-gold flex-shrink-0" />
                  <p className="font-body text-base text-cream-paper">
                    hello@brewhousecafe.co.uk
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram size={18} className="text-warm-gold flex-shrink-0" />
                  <p className="font-body text-base text-cream-paper">
                    @brewhousecafe
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cream-paper/70 mb-4">
                Opening Hours
              </h3>
              <div className="space-y-1">
                <p className="font-body text-sm text-cream-paper">
                  Monday – Friday: 7:00 – 23:00
                </p>
                <p className="font-body text-sm text-cream-paper/70">
                  Saturday – Sunday: 9:00 – 23:00
                </p>
              </div>
            </div>

            {/* Floating doodle */}
            <div className="pt-4">
              <div className="w-16 h-16 rounded-full border-2 border-cream-paper/30 flex items-center justify-center text-cream-paper/50 animate-float">
                <Coffee size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-20 pt-8 border-t border-cream-paper/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-body text-sm text-cream-paper/60">
            Coffee by day, cold pints by night. Your all-day local in the heart of Shoreditch.
          </p>
          <p className="font-mono text-xs text-cream-paper/50">
            © BREW HOUSE. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
