import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Instagram, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import './index.css';

type Category = 'CAFÉS' | 'BEBIDAS ESPECIALES' | 'REPOSTERÍA' | 'SÁNDWICHES Y MÁS' | 'EXTRAS';
type GalleryImage = { src: string; alt: string; caption: string };

const CONTACT = {
  instagramHandle: '@luz.yamor.cafe',
  instagramUrl: 'https://www.instagram.com/aaronmejiavg/',
  whatsappNumber: '50684756122',
  whatsappMessage: 'Hola, Luz y Amor. Quiero ordenar algo rico de la cafetería.',
  mapUrl: 'https://maps.app.goo.gl/3RhArAYCtBDJTQZ57',
};

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

const MENU: Record<Category, { name: string; description: string; price: string }[]> = {
  'CAFÉS': [
    { name: 'Espresso', description: 'Corto, intenso y de origen costarricense.', price: '₡1.600' },
    { name: 'Americano', description: 'La pausa de siempre, servida con calma.', price: '₡1.800' },
    { name: 'Cappuccino', description: 'Espuma suave, espresso y un toque de canela.', price: '₡2.400' },
    { name: 'Latte', description: 'Sedoso y cremoso, para alargar la conversación.', price: '₡2.500' },
    { name: 'Mocaccino', description: 'Café, chocolate y una dulzura bien medida.', price: '₡2.700' },
    { name: 'Cold Brew', description: 'Infusión lenta, fresca y profundamente aromática.', price: '₡2.600' },
  ],
  'BEBIDAS ESPECIALES': [
    { name: 'Matcha Latte', description: 'Matcha ceremonial, leche cremosa y calma.', price: '₡2.900' },
    { name: 'Chocolate de la casa', description: 'Cacao, leche caliente y una nube de espuma.', price: '₡2.700' },
    { name: 'Limonada de hierbabuena', description: 'Cítrica, fresca y hecha al momento.', price: '₡2.300' },
    { name: 'Té de la tarde', description: 'Una infusión escogida para bajar el ritmo.', price: '₡2.100' },
  ],
  'REPOSTERÍA': [
    { name: 'Roll de canela', description: 'Horneado en casa, glaseado apenas tibio.', price: '₡2.300' },
    { name: 'Torta de chocolate', description: 'Cacao oscuro, miga húmeda y sal marina.', price: '₡2.900' },
    { name: 'Cheesecake de frutos rojos', description: 'Cremoso, ligero y con fruta de temporada.', price: '₡3.200' },
    { name: 'Galleta de la casa', description: 'Mantequilla, chocolate y bordes crujientes.', price: '₡1.500' },
  ],
  'SÁNDWICHES Y MÁS': [
    { name: 'Croissant de jamón y queso', description: 'Hojaldre dorado, relleno generoso.', price: '₡3.900' },
    { name: 'Sándwich Luz', description: 'Pollo, pesto, tomate y pan artesanal.', price: '₡4.600' },
    { name: 'Tostada de aguacate', description: 'Pan de masa madre, aguacate y semillas.', price: '₡3.800' },
    { name: 'Bowl de fruta', description: 'Fruta fresca, yogurt y granola de la casa.', price: '₡3.500' },
  ],
  EXTRAS: [
    { name: 'Leche vegetal', description: 'Avena, almendra o coco.', price: '+₡500' },
    { name: 'Shot de espresso', description: 'Porque hay días que piden uno más.', price: '+₡700' },
    { name: 'Sirope de vainilla', description: 'Un toque dulce, sin robar protagonismo.', price: '+₡400' },
  ],
};

const SECRET_MENU = [
  { name: 'Poción de Amor', description: 'Chocolate blanco, fresa y espuma de rosa.', price: '₡3.400' },
  { name: 'Café de los Sueños', description: 'Cold brew, vainilla, canela y un beso de crema.', price: '₡3.100' },
  { name: 'Abrazo en Taza', description: 'Chocolate caliente, malvavisco tostado y cariño.', price: '₡3.000' },
  { name: 'Beso de Fresa', description: 'Fresas, leche y una nube rosada de dulzura.', price: '₡2.900' },
  { name: 'Nube de Vainilla', description: 'Latte frío, vainilla y espuma fría de la casa.', price: '₡2.800' },
  { name: 'Elixir de Energía', description: 'Espresso, cacao, miel y un poco de atrevimiento.', price: '₡3.200' },
];

const GALLERY: GalleryImage[] = [
  { src: '/images/hero-cafe.jpg', alt: 'Interior cálido de Luz y Amor', caption: 'la casa / 01' },
  { src: '/images/coffee-pour.jpg', alt: 'Manos sirviendo café en una taza artesanal', caption: 'cada taza / 02' },
  { src: '/images/pastry-table.jpg', alt: 'Repostería y café sobre una mesa', caption: 'para compartir / 03' },
  { src: '/images/cafe-detail.jpg', alt: 'Detalles botánicos y café', caption: 'pequeños detalles / 04' },
];

const chapters = [
  ['historia', 'la casa', '01'],
  ['menu', 'la carta', '02'],
  ['secreto', 'la confidencia', '03'],
  ['galeria', 'la mesa', '04'],
  ['contacto', 'ven a vernos', '05'],
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Chapter({ children }: { children: string }) {
  return <div className="chapter">{children}</div>;
}

export function Redesign() {
  const [activeCategory, setActiveCategory] = useState<Category>('CAFÉS');
  const [secretOpen, setSecretOpen] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.luz-redesign .reveal').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigate = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="luz-redesign paper-grain">
      <header className="top-bar">
        <a href="#inicio" onClick={() => navigate('inicio')} data-testid="link-mobile-brand">
          Luz y amor<small>CAFETERÍA</small>
        </a>
        <button className="top-toggle" aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(open => !open)} data-testid="button-mobile-menu">
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>
      <nav className="mobile-menu" aria-label="Navegación móvil">
        {chapters.map(([id, label, number]) => (
          <a href={`#${id}`} key={id} onClick={() => navigate(id)} data-testid={`mobile-link-${id}`}>
            <span className="menu-index">{number} / </span>{label}
          </a>
        ))}
      </nav>

      <aside className="journal-rail" aria-label="Índice del cuaderno">
        <a href="#inicio" className="rail-brand" onClick={() => navigate('inicio')} data-testid="link-brand">
          <strong>L<br />&amp;<br />A</strong><small>cuaderno</small>
        </a>
        <nav className="rail-links" aria-label="Capítulos">
          {chapters.map(([id, label, number]) => (
            <a href={`#${id}`} className="rail-link" key={id} onClick={() => navigate(id)} aria-label={`Ir a ${label}`} data-testid={`rail-link-${id}`}>
              {number} · {label}
            </a>
          ))}
        </nav>
        <span className="rail-footer">Costa Rica / 2024</span>
      </aside>

      <main>
        <section className="hero" id="inicio" data-testid="section-hero">
          <div className="hero-index index-label">apertura / una mesa para volver a ti</div>
          <div className="hero-copy">
            <p className="eyebrow reveal">Luz y Amor — cuaderno de casa</p>
            <h1 className="display reveal delay-1" data-testid="text-hero-title">Luz <em>y amor</em></h1>
            <p className="hero-intro reveal delay-2">Una cafetería costarricense para leer el día despacio, taza a taza.</p>
            <div className="hero-actions reveal delay-3">
              <button className="button-primary" onClick={() => navigate('menu')} data-testid="button-view-menu">Abrir la carta <ArrowRight size={15} /></button>
              <button className="button-quiet" onClick={() => navigate('historia')} data-testid="button-discover">Leer la historia</button>
            </div>
          </div>
          <figure className="hero-card reveal delay-2">
            <img src="/images/cafe-detail.jpg" alt="Detalle botánico y café en Luz y Amor" />
            <figcaption><span>nota visual / 00</span><span>hecho aquí</span></figcaption>
          </figure>
          <span className="hero-note">baja despacio</span>
        </section>

        <section className="chapter-intro reveal" id="historia" data-testid="section-story-intro">
          <div>
            <Chapter>01 — la casa</Chapter>
            <h2 className="display">Un lugar para compartir <em>paz.</em></h2>
          </div>
          <p>Hay lugares que no se visitan: se vuelven parte de la rutina bonita.</p>
        </section>
        <section className="story" aria-labelledby="story-heading">
          <div className="story-index reveal">
            <span className="index-label">entrada / 001</span>
            <strong>07:00</strong>
            <span className="index-label">abre la casa</span>
          </div>
          <div className="story-copy reveal delay-1">
            <h3 id="story-heading" className="display">Café de aquí.<br />Calidez para todos.</h3>
            <p>Luz y Amor nació para hacer espacio a lo que importa: una conversación sin prisa, una taza bien hecha, una pausa que se siente de verdad.</p>
            <p>Somos una cafetería costarricense hecha con cariño, propósito y atención a esos pequeños detalles que convierten una visita en un recuerdo.</p>
            <strong>Siéntate. Ya estás en casa.</strong>
          </div>
          <figure className="story-image reveal delay-2">
            <img src="/images/coffee-pour.jpg" alt="Manos sirviendo café en una taza artesanal" loading="lazy" />
          </figure>
          <p className="story-note reveal delay-3">Una pausa que se siente de verdad.<span>apunte al margen / con cariño</span></p>
        </section>

        <section className="menu-section paper-grain" id="menu" data-testid="section-menu">
          <div className="menu-layout">
            <div className="menu-side reveal">
              <Chapter>02 — la carta</Chapter>
              <h2 className="display">Para cada <em>antojo.</em></h2>
              <p>Ingredientes sencillos tratados con el respeto que merecen.</p>
              <span className="menu-meta">registro de cocina<br />precios en colones<br />pregunta por fuera de carta</span>
            </div>
            <div className="menu-content reveal delay-1">
              <div className="category-nav" role="tablist" aria-label="Categorías del menú">
                {(Object.keys(MENU) as Category[]).map(category => (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={activeCategory === category}
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                    data-testid={`tab-category-${category.toLowerCase().replaceAll(' ', '-')}`}
                  >{category}</button>
                ))}
              </div>
              <div className="menu-list" role="tabpanel" aria-live="polite" data-testid="list-menu-items">
                {MENU[activeCategory].map((item, index) => (
                  <div className="menu-row" key={item.name} style={{ animationDelay: `${index * 65}ms` }} data-testid={`menu-item-${item.name.toLowerCase().replaceAll(' ', '-')}`}>
                    <span className="menu-number">0{index + 1}</span>
                    <div><div className="menu-name">{item.name}</div><div className="menu-desc">{item.description}</div></div>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="menu-footnote"><span>Actualizado con la calma de la casa</span><span>Consulta disponibilidad del día</span></div>
            </div>
          </div>
        </section>

        <section className="secret" id="secreto" data-testid="section-secret">
          <div className="secret-inner">
            <Chapter>03 — una confidencia</Chapter>
            <h2 className="display reveal">Menú secreto</h2>
            <p className="secret-lead reveal delay-1">Solo para almas bonitas que se atreven a preguntar.</p>
            <button className="secret-trigger reveal delay-2" aria-expanded={secretOpen} onClick={() => setSecretOpen(open => !open)} data-testid="button-secret-menu">
              {secretOpen ? 'Guardar el secreto' : 'Quiero algo fuera de carta'} <ChevronDown size={14} className={secretOpen ? 'rotate' : ''} />
            </button>
            {secretOpen && (
              <div className="secret-list" data-testid="list-secret-items">
                {SECRET_MENU.map((item, index) => (
                  <div className="secret-item" key={item.name} style={{ animationDelay: `${index * 85}ms` }} data-testid={`secret-item-${index}`}>
                    <div><div className="secret-item-name">{item.name}</div><div className="secret-item-desc">{item.description}</div></div>
                    <div className="secret-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="gallery" id="galeria" data-testid="section-gallery">
          <div className="gallery-head reveal">
            <div><Chapter>04 — la mesa</Chapter><h2 className="display">Así se <em>siente.</em></h2></div>
            <p>La luz entra, el café se enfría despacio y siempre hay espacio para una historia más.</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((image, index) => (
              <button className="gallery-item reveal" key={image.src} onClick={() => setLightbox(image)} aria-label={`Ver imagen: ${image.alt}`} data-testid={`button-gallery-${index}`}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span className="gallery-caption">{image.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="philosophy" id="filosofia" data-testid="section-philosophy">
          <div className="philosophy-inner">
            <Chapter>una manera de hacer</Chapter>
            <h2 className="display reveal delay-1">Hecho con <em>propósito.</em></h2>
            <p className="philosophy-copy reveal delay-2">Gracias por apoyar un espacio hecho con amor, fe y propósito.<br /><br />En Luz y Amor, el ingrediente secreto siempre eres tú.</p>
            <div className="philosophy-mark reveal delay-3" aria-hidden="true">L&amp;A</div>
          </div>
        </section>

        <section className="contact" id="contacto" data-testid="section-contact">
          <div className="contact-copy reveal">
            <Chapter>05 — ven a vernos</Chapter>
            <h2 className="display">Hecho en<br /><em>Costa Rica.</em></h2>
            <p className="contact-lead">Trae tu día como venga. Aquí le ponemos una taza caliente y un poco de luz.</p>
          </div>
          <div className="contact-details reveal delay-1">
            <div className="contact-detail"><span className="contact-label">Horario</span><p>Lunes a Domingo<br />7:00 a.m. – 7:00 p.m.</p></div>
            <div className="contact-detail"><span className="contact-label">Instagram</span><p>{CONTACT.instagramHandle}</p></div>
            <div className="contact-detail"><span className="contact-label">Ubicación</span><p>Próximamente disponible</p></div>
            <div className="contact-detail"><span className="contact-label">Reservas</span><a className="contact-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <ArrowRight size={13} aria-hidden="true" /></a></div>
            <div className="social-actions">
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-instagram"><Instagram size={14} /> Instagram</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="link-whatsapp"><MessageCircle size={14} aria-hidden="true" /> WhatsApp</a>
              <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer" data-testid="link-location"><MapPin size={14} /> Ver ubicación</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" data-testid="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><a href="#inicio" onClick={() => navigate('inicio')}>Luz y amor<small>CAFETERÍA</small></a><p>Gracias por elegir Luz y Amor.</p></div>
          <nav className="footer-nav" aria-label="Navegación del pie de página">
            {chapters.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => navigate(id)}>{label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Luz y Amor</p><p>Costa Rica · con cariño</p></div>
      </footer>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)} data-testid="lightbox">
          <button className="lightbox-close" aria-label="Cerrar imagen" onClick={() => setLightbox(null)} data-testid="button-close-lightbox"><X size={18} /></button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={event => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default Redesign;