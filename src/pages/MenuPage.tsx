import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Clock, MapPin, Phone, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  vegetarian?: boolean;
  vegan?: boolean;
  popular?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  note?: string;
}

const menuData: MenuSection[] = [
  {
    title: 'YOGHURT BOWLS',
    items: [
      { name: 'Fruit Bowl', description: 'Greek yoghurt, seasonal fresh fruits, honey, granola & mixed seeds', price: '£6.50', vegetarian: true },
      { name: 'Nutty Bowl', description: 'Greek yoghurt, banana, peanut butter, mixed nuts, chia seeds & honey', price: '£6.95', vegetarian: true },
      { name: 'The Essential', description: 'Greek yoghurt, fresh seasonal fruits, homemade granola & honey', price: '£6.50', vegetarian: true },
    ],
  },
  {
    title: 'PORRIDGES',
    note: 'All porridges made with wholegrain Scottish oats',
    items: [
      { name: 'The Original', description: 'With cinnamon, honey & fresh seasonal fruits', price: '£5.50', vegetarian: true, vegan: true },
      { name: 'Banana Nut', description: 'With banana, peanut butter, mixed nuts, chia seeds & honey', price: '£6.50', vegetarian: true },
      { name: 'Apple Pie', description: 'With caramelised apples, cinnamon, walnuts & maple syrup', price: '£6.50', vegetarian: true, vegan: true },
    ],
  },
  {
    title: 'AVOCADO ON TOAST',
    note: 'Sourdough bread',
    items: [
      { name: 'Smashed Avo', description: 'Smashed avocado, chilli flakes, lemon juice, extra virgin olive oil', price: '£7.50', vegetarian: true, vegan: true },
      { name: 'Poached Eggs', description: 'Two poached eggs on smashed avocado', price: '£9.50', vegetarian: true },
      { name: 'Feta Cheese', description: 'Smashed avocado with feta cheese, cherry tomatoes, pomegranate', price: '£9.50', vegetarian: true },
      { name: 'Smashed Salmon', description: 'Smashed avocado with smoked salmon, poached egg, dill', price: '£11.50' },
      { name: 'Bacon Avo', description: 'Smashed avocado with crispy bacon, poached egg', price: '£10.50' },
    ],
  },
  {
    title: 'BREAKFASTS',
    note: 'Served until 12pm (weekends until 1pm)',
    items: [
      { name: 'Full English Breakfast', description: 'Two eggs, bacon, sausage, beans, mushrooms, grilled tomato, toast', price: '£11.50', popular: true },
      { name: 'Vegetarian Breakfast', description: 'Two eggs, veggie sausage, beans, mushrooms, grilled tomato, halloumi, toast', price: '£11.50', vegetarian: true },
      { name: 'Vegan Breakfast', description: 'Vegan sausage, beans, mushrooms, grilled tomato, avocado, toast', price: '£11.50', vegan: true },
      { name: 'Eggs Benedict', description: 'Poached eggs, ham, hollandaise sauce on English muffin', price: '£10.50' },
      { name: 'Eggs Royale', description: 'Poached eggs, smoked salmon, hollandaise sauce on English muffin', price: '£12.50' },
      { name: 'Eggs Florentine', description: 'Poached eggs, spinach, hollandaise sauce on English muffin', price: '£10.50', vegetarian: true },
      { name: 'Full Mediterranean Breakfast', description: 'Two eggs, halloumi, sucuk, olives, tomatoes, cucumber, pitta bread', price: '£12.50' },
    ],
  },
  {
    title: 'BURGERS',
    note: 'All burgers served with chips',
    items: [
      { name: 'Chicken Burger', description: 'Grilled chicken breast, lettuce, tomato, mayo, brioche bun', price: '£11.95' },
      { name: 'Breakfast Beef Burger', description: 'Beef patty, bacon, egg, cheese, lettuce, tomato, brioche bun', price: '£13.95', popular: true },
      { name: 'Vegetarian Burger', description: 'Veggie patty, lettuce, tomato, cheese, mayo, brioche bun', price: '£11.95', vegetarian: true },
      { name: 'Vegan Burger', description: 'Vegan patty, lettuce, tomato, vegan cheese, vegan mayo, brioche bun', price: '£11.95', vegan: true },
    ],
  },
  {
    title: 'CLUB SANDWICHES',
    note: 'All served with chips',
    items: [
      { name: 'Classic Club', description: 'Chicken, bacon, lettuce, tomato, mayo, toasted bread', price: '£11.95' },
      { name: 'Veggie Club', description: 'Halloumi, avocado, lettuce, tomato, pesto, toasted bread', price: '£11.95', vegetarian: true },
    ],
  },
  {
    title: 'SALADS',
    items: [
      { name: 'Greek Salad', description: 'Tomatoes, cucumber, red onion, olives, feta cheese, oregano, olive oil', price: '£9.50', vegetarian: true },
      { name: 'Chicken Salad', description: 'Grilled chicken, mixed leaves, cherry tomatoes, cucumber, olives, feta', price: '£11.50' },
      { name: 'Quinoa Salad', description: 'Quinoa, avocado, chickpeas, pomegranate, mixed seeds, lemon dressing', price: '£10.50', vegan: true },
      { name: 'Tuna Salad', description: 'Tuna, mixed leaves, cherry tomatoes, cucumber, olives, red onion', price: '£11.50' },
      { name: 'Sweet Potato & Feta Salad', description: 'Roasted sweet potato, feta cheese, rocket, walnuts, pomegranate', price: '£10.50', vegetarian: true },
    ],
  },
  {
    title: 'SEASONAL SOUP',
    items: [
      { name: 'Soup of the Day', description: 'Served with crusty bread', price: '£6.50', vegan: true },
    ],
  },
  {
    title: 'MAKE YOUR OWN TOASTIE',
    note: 'Choose your bread and fillings',
    items: [
      { name: 'Cheese & Ham', price: '£5.50' },
      { name: 'Cheese & Tomato', price: '£5.50', vegetarian: true },
      { name: 'Cheese & Tuna', price: '£6.50' },
      { name: 'Cheese & Bacon', price: '£6.50' },
      { name: 'Cheese & Veggie Sausage', price: '£6.50', vegetarian: true },
    ],
  },
  {
    title: 'CHIPS',
    items: [
      { name: 'Regular Chips', price: '£3.50', vegan: true },
      { name: 'Cheesy Chips', price: '£4.50', vegetarian: true },
      { name: 'Chilli Cheese Chips', price: '£5.50' },
    ],
  },
  {
    title: 'EXTRAS',
    items: [
      { name: 'Toast (2 slices)', price: '£2.50', vegetarian: true },
      { name: 'Eggs (2)', price: '£3.00', vegetarian: true },
      { name: 'Bacon (3 rashers)', price: '£3.50' },
      { name: 'Sausage', price: '£3.50' },
      { name: 'Halloumi', price: '£3.50', vegetarian: true },
      { name: 'Avocado', price: '£2.50', vegan: true },
      { name: 'Beans', price: '£2.00', vegan: true },
      { name: 'Mushrooms', price: '£2.50', vegan: true },
      { name: 'Tomatoes', price: '£2.00', vegan: true },
    ],
  },
];

export default function MenuPage() {
  const headerRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.querySelector('.header-content'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Section animations on scroll
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        gsap.fromTo(
          section,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-cream-paper">
      {/* Paper grain overlay */}
      <div className="paper-grain" />

      {/* Header */}
      <header
        ref={headerRef}
        className="relative bg-terracotta py-16 md:py-24 overflow-hidden"
      >
        <div className="header-content relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          {/* Back button */}
          <button
            onClick={goBack}
            className="absolute top-0 left-6 md:left-0 flex items-center gap-2 text-cream-paper/80 hover:text-cream-paper transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-center mt-8">
            <p className="text-eyebrow text-cream-paper/70 mb-4">
              Shoreditch, London
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream-paper leading-[0.95] tracking-tight mb-6">
              OUR MENU
            </h1>
            <p className="font-body text-lg text-cream-paper/80 max-w-md mx-auto">
              Hearty all-day food and great coffee — served until close
            </p>
          </div>

          {/* Dietary legend */}
          <div className="flex justify-center gap-6 mt-8 text-cream-paper/70">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-cream-paper/50 flex items-center justify-center text-xs font-mono">
                V
              </span>
              <span className="font-body text-sm">Vegetarian</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-cream-paper/50 flex items-center justify-center text-xs font-mono">
                VG
              </span>
              <span className="font-body text-sm">Vegan</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-cream-paper to-transparent" />
      </header>

      {/* Menu Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {menuData.map((section, index) => (
            <section
              key={section.title}
              ref={(el) => { sectionsRef.current[index] = el; }}
              className="menu-section"
            >
              {/* Section Title */}
              <div className="mb-8 pb-4 border-b-2 border-espresso/10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso tracking-tight">
                  {section.title}
                </h2>
                {section.note && (
                  <p className="font-body text-sm text-espresso/60 mt-2 italic">
                    {section.note}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex justify-between items-start gap-4 py-3 hover:bg-white/50 px-4 -mx-4 rounded transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-body text-base md:text-lg font-medium text-espresso">
                          {item.name}
                        </h3>
                        {item.popular && (
                          <span className="px-2 py-0.5 bg-warm-gold/20 text-warm-gold text-xs font-mono uppercase tracking-wider rounded">
                            Popular
                          </span>
                        )}
                        <div className="flex gap-1">
                          {item.vegetarian && (
                            <span className="w-5 h-5 rounded-full border border-espresso/30 flex items-center justify-center text-[10px] font-mono text-espresso/60">
                              V
                            </span>
                          )}
                          {item.vegan && (
                            <span className="w-5 h-5 rounded-full border border-espresso/30 flex items-center justify-center text-[10px] font-mono text-espresso/60">
                              VG
                            </span>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="font-body text-sm text-espresso/60 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-base md:text-lg font-medium text-terracotta whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Allergen note */}
        <div className="mt-20 pt-8 border-t-2 border-espresso/10">
          <p className="font-body text-sm text-espresso/60 text-center">
            Please inform our staff of any allergies or dietary requirements. 
            All dishes are prepared in a kitchen that handles nuts, gluten, dairy, and other allergens.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-espresso text-cream-paper py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & tagline */}
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">BREW HOUSE</h3>
              <p className="font-body text-sm text-cream-paper/70">
                Coffee by day, cold pints by night
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-cream-paper/50 mb-4">
                Contact
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-warm-gold" />
                  <span>42 Curtain Road, London EC2A 3AT</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-warm-gold" />
                  <span>020 7739 4200</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-cream-paper/50 mb-4">
                Opening Hours
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-warm-gold" />
                  <span>Mon–Fri: 7am–11pm</span>
                </div>
                <p className="text-cream-paper/70 ml-6">Sat–Sun: 9am–11pm</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-cream-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-cream-paper/50">
              © BREW HOUSE. All rights reserved.
            </p>
            <a
              href="https://instagram.com/brewhousecafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream-paper/70 hover:text-cream-paper transition-colors"
            >
              <Instagram size={18} />
              <span className="font-body text-sm">@brewhousecafe</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
