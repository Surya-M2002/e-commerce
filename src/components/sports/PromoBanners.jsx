import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'Gear Up', subtitle: 'Fitness essentials', cta: 'Shop Gear', to: '/sports', gradient: 'linear-gradient(90deg,#c8e6c9 0%, #a5d6a7 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082930/uploads/sports/tennis_ball_pack.png' },
  { title: 'Outdoor Fun', subtitle: 'Camping & hiking', cta: 'Explore', to: '/sports', gradient: 'linear-gradient(90deg,#b2dfdb 0%, #80cbc4 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082924/uploads/sports/Sports_Shoes.png' },
  { title: 'Weekend Play', subtitle: 'Ball sports picks', cta: 'Browse', to: '/sports', gradient: 'linear-gradient(90deg,#bbdefb 0%, #90caf9 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082914/uploads/sports/Screenshot_2025-12-23_171718.png' },
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
