import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'Fresh Styles', subtitle: 'New season arrivals', cta: 'Shop Now', to: '/clothing', gradient: 'linear-gradient(90deg,#f8bbd0 0%, #f48fb1 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082357/uploads/clothings/Sweatshirt.jpg' },
  { title: 'Footwear Deals', subtitle: 'Comfort and performance', cta: 'View Deals', to: '/clothing', gradient: 'linear-gradient(90deg,#ffe082 0%, #ffca28 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082330/uploads/clothings/Formal_Shoes.jpg' },
  { title: 'Accessories', subtitle: 'Complete your look', cta: 'Browse', to: '/clothing', gradient: 'linear-gradient(90deg,#c5e1a5 0%, #aed581 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082325/uploads/clothings/Cotton_Trousers.jpg' },
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

