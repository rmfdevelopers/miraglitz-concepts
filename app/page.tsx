'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Wrench, MapPin, Shield, Truck, Layers, Globe, 
  Building2, Mail, Instagram, ArrowRight, Loader2, 
  CheckCheck, ImageOff, Phone, Menu, X, ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: oversized

// ===== UTILS & HOOKS =====

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 65) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-slate-900 border border-white/5 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

// ===== COMPONENTS =====

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: "Systems", href: "#features" },
    { name: "Infrastructure", href: "#about" },
    { name: "Solutions", href: "#products" },
    { name: "Inquiry", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-7'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[var(--accent)] flex items-center justify-center rounded-sm">
            <span className="text-[var(--primary)] text-lg">M</span>
          </div>
          MIRAGLITZ
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a key={l.name} href={l.href} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-[var(--accent)] transition-colors">
              {l.name}
            </a>
          ))}
          <a href="#contact" className="bg-[var(--accent)] text-[var(--primary)] px-6 py-2.5 font-black text-sm uppercase tracking-tighter hover:scale-105 transition-all">
            Request Quote
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-[var(--primary)] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-black tracking-tighter">MIRAGLITZ</span>
            <button onClick={() => setMobileOpen(false)}><X size={32} /></button>
          </div>
          <div className="space-y-8">
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="block text-4xl font-black uppercase tracking-tighter hover:text-[var(--accent)] transition-colors">
                {l.name}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <a href="#contact" onClick={() => setMobileOpen(false)} className="w-full block bg-[var(--accent)] text-[var(--primary)] text-center py-5 font-black text-xl uppercase">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ===== SECTIONS =====

const Hero = () => {
  const typedText = useTypewriter("PRECISION AT SCALE");
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h1 className="font-heading text-[15vw] md:text-[10vw] font-black text-white leading-[0.85] tracking-tighter break-words">
          {typedText}<span className="text-[var(--accent)] animate-pulse">_</span>
        </h1>
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10">
          <div className="max-w-md">
            <p className="text-white/40 text-sm uppercase font-bold tracking-[0.3em] mb-4">Industrial Logistics Hub</p>
            <p className="text-white/50 text-xl leading-relaxed">Nigeria’s premier hub for high-volume industrial printing and bespoke corporate branding.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href="#contact" className="bg-[var(--accent)] text-[var(--primary)] px-12 py-5 font-black text-lg uppercase tracking-tighter shadow-[8px_8px_0px_rgba(255,255,255,0.05)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 text-center">
              Request Quote
            </a>
            <a href="#about" className="border border-white/15 text-white px-12 py-5 font-black text-lg uppercase tracking-tighter hover:bg-white/5 transition-all text-center">
              Infrastructure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  const features = [
    { 
      title: "1200 DPI Precision", 
      description: "Utilizing the latest industrial printing arrays for razor-sharp accuracy at any scale.", 
      icon: <Layers size={24} className="text-[var(--accent)]" /> 
    },
    { 
      title: "Nationwide Logistics", 
      description: "In-house distribution network covering Abuja, Lagos, and all 36 Nigerian states.", 
      icon: <Truck size={24} className="text-[var(--accent)]" /> 
    },
    { 
      title: "Bespoke Engineering", 
      description: "Custom technical solutions tailored for high-volume corporate requirements.", 
      icon: <Shield size={24} className="text-[var(--accent)]" /> 
    }
  ];

  return (
    <section id="features" ref={revealRef} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[var(--primary)]/40 font-black tracking-[0.3em] uppercase text-xs mb-4">Technical Excellence</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] leading-none tracking-tighter">ENGINEERED FOR QUALITY</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 bg-[var(--primary)] rounded-3xl p-10 md:p-14 flex flex-col justify-between group min-h-[400px] transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20 group-hover:scale-110 transition-transform duration-500">
              <Layers size={32} className="text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="font-heading text-4xl font-black text-white tracking-tighter">{features[0].title}</h3>
              <p className="text-white/40 mt-4 text-lg leading-relaxed max-w-xl">{features[0].description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {features.slice(1).map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${400 + (i * 200)}ms` }}
                className={`bg-white rounded-3xl p-10 border border-[var(--primary)]/5 flex flex-col justify-between min-h-[250px] transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-10">{f.icon}</div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-[var(--primary)] tracking-tight">{f.title}</h3>
                  <p className="text-[var(--primary)]/50 text-sm mt-2">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DividerStats = () => (
  <div className="bg-[var(--accent)] py-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--primary)]/10 text-center">
      {[
        { number: '5.3k+', label: 'Clients Served' },
        { number: '1.8k+',  label: 'Projects Completed' },
        { number: '36', label: 'States Covered' }
      ].map((s, i) => (
        <div key={i} className="px-8 py-8 md:py-4">
          <p className="text-6xl font-black text-[var(--primary)] tracking-tighter">{s.number}</p>
          <p className="text-[var(--primary)]/60 text-xs mt-2 font-black uppercase tracking-[0.2em]">{s.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const Process = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  const steps = [
    { number: "01", title: "Bespoke Consultation", description: "Analyzing technical specs for high-volume industrial requirements." },
    { number: "02", title: "Precision Fabrication", description: "Execution on our state-of-the-art infrastructure grid." },
    { number: "03", title: "Nationwide Dispatch", description: "Direct logistics deployment from our Abuja or Lagos hubs." }
  ];

  return (
    <section ref={revealRef} className="py-28 px-6 bg-[var(--primary)] relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <p className="text-[var(--accent)] font-black tracking-[0.4em] uppercase text-xs mb-4">The Workflow</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">FROM BLUEPRINT TO DELIVERY</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-white/10 z-0" />
          {steps.map((step, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 200}ms` }}
              className={`relative z-10 group transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <div className="w-20 h-20 rounded-full bg-[var(--primary)] border-4 border-white/5 flex items-center justify-center mb-8 group-hover:border-[var(--accent)]/50 transition-colors duration-500">
                <span className="text-2xl font-black text-[var(--accent)]">{step.number}</span>
              </div>
              <h3 className="font-heading text-2xl font-black text-white tracking-tight mb-4">{step.title}</h3>
              <p className="text-white/40 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  return (
    <section id="about" ref={revealRef} className="py-28 px-6 bg-[var(--accent)]/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <p className="text-[var(--accent)] font-black tracking-[0.3em] uppercase text-xs mb-4">Infrastructure</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            INDUSTRIAL <br/> GRADE <br/> SYSTEMS.
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
            Miraglitz Concepts operates at the intersection of craftsmanship and industrial machinery. We emphasize physical infrastructure and nationwide logistics to ensure every pixel is printed with 100% fidelity.
          </p>
          <div className="flex items-center gap-4 text-[var(--accent)] font-black uppercase tracking-widest text-sm">
            <span className="w-10 h-px bg-[var(--accent)]/30" />
            Sharp delivery, nationwide.
          </div>
        </div>
        <div className={`relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage 
            src="https://images.unsplash.com/photo-1700718008794-3db41f8d6c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Industrial Logistics"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-white font-black text-xl tracking-tight">Technical Hub Abuja & Lagos</p>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Operational Capacity: 10,000+ Units/Mo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  const products = [
    { name: "Bulk Fleet Branding", price: "₦1,850,000+", description: "Comprehensive vinyl wrapping for logistics fleets using industrial-grade weather-resistant polymers." },
    { name: "Corporate Identity Kits", price: "₦450,000+", description: "High-precision stationary, uniforms, and interior signage for enterprise-level headquarters." },
    { name: "Large Format Industrial Signage", price: "₦920,000+", description: "Precision-cut 3D LED signage and architectural displays designed for maximum visibility." },
    { name: "Nationwide Promo Distribution", price: "₦2,500,000+", description: "Logistics-backed printing and delivery for nationwide product launch campaigns." }
  ];

  return (
    <section id="products" ref={revealRef} className="py-28 px-6 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">SOLUTIONS</h2>
          <p className="text-white/30 text-right font-black uppercase tracking-[0.2em] text-xs max-w-xs">High-Volume Industrial Offerings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`group relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-6 scale-95'}`}>
              <SafeImage src={`https://images.unsplash.com/photo-1700718008794-3db41f8d6c16?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80`} alt={p.name} fill
                className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <span className="bg-[var(--accent)] text-[var(--primary)] px-4 py-1.5 font-black text-xs uppercase tracking-widest mb-4 inline-block">{p.price}</span>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-4 group-hover:text-[var(--accent)] transition-colors">{p.name}</h3>
                <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                  <p className="text-white/50 text-base leading-relaxed line-clamp-2">{p.description}</p>
                </div>
                <a href="#contact" className="mt-6 flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.2em] group/btn">
                  Enquire Project <ChevronRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  const items = [
    { name: "Adewale Okonjo", text: "The scale of their logistics is unmatched. They handled our 500-vehicle fleet rebrand in record time.", role: "Operations Lead, FMCG Corp" },
    { name: "Ngozi Bello", text: "Technical excellence isn't just a slogan; it's visible in every DPI of their signage work.", role: "Procurement Manager, Abuja" },
    { name: "Chinedu Ibe", text: "When we needed 10,000 units delivered to 36 states in 4 days, Miraglitz Concept was the only one that could deliver.", role: "CMO, Tech Giant" }
  ];

  return (
    <section ref={revealRef} className="py-28 bg-[var(--secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] tracking-tighter">CLIENT VERDICTS</h2>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[250%] md:w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused] py-4">
          {[...items, ...items].map((t, i) => (
            <div key={i} className={`w-80 md:w-[450px] shrink-0 bg-[var(--primary)] rounded-[2.5rem] p-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}
              style={{ transitionDelay: `${(i % 3) * 150}ms` }}>
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />)}
              </div>
              <p className="text-white/70 text-xl leading-relaxed italic font-medium mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-black text-xl border border-[var(--accent)]/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-white text-lg tracking-tight">{t.name}</p>
                  <p className="text-white/30 text-xs uppercase font-bold tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ isVisible, revealRef }: { isVisible: boolean, revealRef: any }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={revealRef} className="py-28 px-6 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[var(--accent)] font-black tracking-[0.4em] uppercase text-xs mb-4">Start Your Scale</p>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-10">LET&apos;S <br/> BUILD.</h2>
          
          <div className="space-y-8 mt-16">
            <div className="group flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                <Mail className="text-white group-hover:text-[var(--primary)]" size={20} />
              </div>
              <p className="text-white/50 text-lg font-bold">hello@miraglitzconcepts.com</p>
            </div>
            <div className="group flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                <Instagram className="text-white group-hover:text-[var(--primary)]" size={20} />
              </div>
              <p className="text-white/50 text-lg font-bold">@miraglitz_concepts</p>
            </div>
            <div className="group flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                <MapPin className="text-white group-hover:text-[var(--primary)]" size={20} />
              </div>
              <p className="text-white/50 text-lg font-bold">Abuja & Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className={`w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {sent ? (
            <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10 text-center animate-scaleIn">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCheck size={40} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">MESSAGE RECEIVED</h3>
              <p className="text-white/40 text-lg">Our industrial hub will review your request and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Inquiry Form</h3>
              <input type="text" placeholder="FULL NAME" required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold placeholder-white/20 outline-none focus:border-[var(--accent)] transition-all"
                onChange={e => setForm({...form, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="EMAIL ADDRESS" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold placeholder-white/20 outline-none focus:border-[var(--accent)] transition-all"
                  onChange={e => setForm({...form, email: e.target.value})} />
                <input type="text" placeholder="PHONE" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold placeholder-white/20 outline-none focus:border-[var(--accent)] transition-all"
                  onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <textarea rows={5} placeholder="TELL US ABOUT THE SCALE OF YOUR PROJECT" required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold placeholder-white/20 outline-none focus:border-[var(--accent)] transition-all resize-none"
                onChange={e => setForm({...form, message: e.target.value})} />
              <button disabled={loading} className="w-full bg-[var(--accent)] text-[var(--primary)] py-5 rounded-xl font-black text-lg uppercase tracking-widest hover:brightness-110 transition-all flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <>TRANSMIT INQUIRY <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="text-center md:text-left">
        <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 justify-center md:justify-start mb-4">
          <div className="w-8 h-8 bg-[var(--accent)] flex items-center justify-center rounded-sm">
            <span className="text-[var(--primary)] text-lg">M</span>
          </div>
          MIRAGLITZ
        </div>
        <p className="text-white/20 text-xs font-black uppercase tracking-[0.5em]">Precision Scale. Industrial Excellence.</p>
      </div>
      
      <div className="flex gap-8">
        {['Instagram', 'LinkedIn', 'Twitter'].map(s => (
          <a key={s} href="#" className="text-white/40 hover:text-[var(--accent)] transition-colors text-xs font-black uppercase tracking-widest">{s}</a>
        ))}
      </div>
      
      <p className="text-white/20 text-xs font-mono">
        © {new Date().getFullYear()} MIRAGLITZ CONCEPTS. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
);

export default function Page() {
  const heroReveal = useScrollReveal(0.1);
  const featReveal = useScrollReveal(0.15);
  const procReveal = useScrollReveal(0.15);
  const abReveal = useScrollReveal(0.15);
  const prodReveal = useScrollReveal(0.15);
  const testReveal = useScrollReveal(0.15);
  const contReveal = useScrollReveal(0.15);

  return (
    <main className="bg-[var(--primary)]">
      <Navbar />
      <Hero />
      <Features isVisible={featReveal.isVisible} revealRef={featReveal.ref} />
      <DividerStats />
      <Process isVisible={procReveal.isVisible} revealRef={procReveal.ref} />
      <About isVisible={abReveal.isVisible} revealRef={abReveal.ref} />
      <Products isVisible={prodReveal.isVisible} revealRef={prodReveal.ref} />
      <Testimonials isVisible={testReveal.isVisible} revealRef={testReveal.ref} />
      <Contact isVisible={contReveal.isVisible} revealRef={contReveal.ref} />
      <Footer />
    </main>
  );
}