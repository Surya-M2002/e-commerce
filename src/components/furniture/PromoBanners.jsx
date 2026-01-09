import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'New Furniture', subtitle: 'Refresh your home', cta: 'Shop Now', to: '/furniture', gradient: 'linear-gradient(90deg,#ffe0b2 0%, #ffcc80 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082635/uploads/furnitures/Filing_Cabinet.jpg' },
  { title: 'Living Deals', subtitle: 'Comfort at best price', cta: 'View Deals', to: '/furniture', gradient: 'linear-gradient(90deg,#c8e6c9 0%, #a5d6a7 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082647/uploads/furnitures/naomi-hebert-2dcYhvbHV-M-unsplash.jpg' },
  { title: 'Weekend Offer', subtitle: 'Up to 30% off', cta: 'Grab Offer', to: '/furniture', gradient: 'linear-gradient(90deg,#b3e5fc 0%, #81d4fa 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082661/uploads/furnitures/sven-brandsma-GZ5cKOgeIB0-unsplash.jpg' },
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
              <h5 className="pb-promo-title mb-1">{b.title}</h5>
              <p className="pb-promo-sub">{b.subtitle}</p>
              <Link to={b.to} className="btn btn-light rounded-pill fw-bold px-3 py-1">{b.cta}</Link>
            </div>
            <div className="p-3"><img src={b.img} alt="" className="pb-promo-img" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PromoBanners;

