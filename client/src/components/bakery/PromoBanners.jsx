import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css'; // Reusing the same CSS

const banners = [
  { title: 'Freshly Baked', subtitle: 'Straight from the oven', cta: 'Order Now', to: '/bakery', gradient: 'linear-gradient(90deg, #ffcc80 0%, #ffab91 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082300/uploads/bakery/pexels-photo-3026809-min.jpg' },
  { title: 'Sweet Treats', subtitle: 'Cakes, Cookies & More', cta: 'Indulge', to: '/bakery', gradient: 'linear-gradient(90deg, #fff59d 0%, #ffcc80 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082287/uploads/bakery/pexels-berkant-12259559-min.jpg' },
  { title: 'Morning Glory', subtitle: 'Best for Breakfast', cta: 'Shop Breads', to: '/bakery', gradient: 'linear-gradient(90deg, #ffe0b2 0%, #ffcc80 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082303/uploads/bakery/pexels-rdne-8963991-min.jpg' },
];

const PromoBanners = () => {
  const trackRef = useRef(null);
  const scrollBy = (delta) => trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  return (
    <div className="position-relative my-4">
      <button className="btn btn-light shadow-sm rounded-circle pb-promo-arrow pb-promo-arrow-left" onClick={() => scrollBy(-400)} aria-label="Scroll left">
        <ChevronLeft size={18} />
      </button>
      <button className="btn btn-light shadow-sm rounded-circle pb-promo-arrow pb-promo-arrow-right" onClick={() => scrollBy(400)} aria-label="Scroll right">
        <ChevronRight size={18} />
      </button>
      <div ref={trackRef} className="pb-promo-track">
        {banners.map((b) => (
          <div key={b.title} className="pb-promo-card shadow-sm" style={{ background: b.gradient }}>
            <div className="p-4">
              <h5 className="pb-promo-title mb-1" style={{ color: '#5d4037' }}>{b.title}</h5>
              <p className="pb-promo-sub" style={{ color: '#5d4037' }}>{b.subtitle}</p>
              <Link to={b.to} className="btn btn-light rounded-pill fw-bold px-3 py-1" style={{ color: '#5d4037' }}>{b.cta}</Link>
            </div>
            <div className="p-3"><img src={b.img} alt="" className="pb-promo-img" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PromoBanners;