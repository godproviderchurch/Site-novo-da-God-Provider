import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Instagram, Youtube, Facebook, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Liderança', path: '/leadership' },
    { name: 'Unidades', path: '/locations' },
    { name: 'Ministérios', path: '/ministries' },
    { name: 'Missões', path: '/missions' },
    { name: 'GP Grupos', path: '/groups' },
    { name: 'Agenda', path: '/events' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-black/90 backdrop-blur-md border-zinc-800 py-3' : 'bg-black border-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="z-50 relative">
            <img src="/images/LOGO-GOD-PROVIDER-BRANCO.png" alt="God Provider Church" className="h-12 w-auto hover:opacity-80 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-bold text-zinc-300 hover:text-white uppercase tracking-widest transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/give"
              className="bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all"
            >
              Contribua
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>


      </header>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-2xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/give"
          className="mt-8 bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest"
        >
          Contribua
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <Link to="/" className="block">
                <img src="/images/LOGO-GOD-PROVIDER-BRANCO.png" alt="God Provider Church" className="h-16 w-auto mb-4" />
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Somos uma igreja apostólica que manifesta o Reino de Deus através do amor e poder, transformando a sociedade.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Navegação</h5>
              <ul className="space-y-3 text-zinc-500 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">Quem Somos</Link></li>
                <li><Link to="/leadership" className="hover:text-white transition-colors">Liderança</Link></li>
                <li><Link to="/locations" className="hover:text-white transition-colors">Nossas Unidades</Link></li>
                <li><Link to="/ministries" className="hover:text-white transition-colors">Ministérios</Link></li>
                <li><Link to="/missions" className="hover:text-white transition-colors">Missões</Link></li>
                <li><Link to="/groups" className="hover:text-white transition-colors">GP Grupos</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Fale Conosco</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Unidade Sede</h5>
              <div className="space-y-3 text-zinc-500 text-sm flex flex-col">
                <span className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 shrink-0" />
                  R. Liberato Carvalho Leite, 86<br />Jd. Monte Kemel, São Paulo - SP
                </span>
                <span className="block mt-4 text-white font-medium">Cultos</span>
                <span>Domingos: 10h, 17h, 19h</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Conecte-se</h5>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Youtube size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Facebook size={18} />
                </a>
              </div>
              <p className="text-zinc-600 text-xs">
                Assine nossa newsletter para receber novidades.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
            <p>&copy; {new Date().getFullYear()} God Provider Church. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacidade</a>
              <a href="#" className="hover:text-white">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};