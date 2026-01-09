import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'New Season', subtitle: 'Fresh styles', cta: 'Shop Fashion', to: '/fashion', gradient: 'linear-gradient(90deg,#f8bbd0 0%, #f48fb1 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082603/uploads/fashions/Running_Shoes.jpg' },
  { title: 'Footwear Focus', subtitle: 'Run in style', cta: 'Shop Shoes', to: '/fashion', gradient: 'linear-gradient(90deg,#ffe082 0%, #ffd54f 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082613/uploads/fashions/Top___Skirt.jpg' },
  { title: 'Accessories', subtitle: 'Belts, bags, more', cta: 'Explore', to: '/fashion', gradient: 'linear-gradient(90deg,#c5e1a5 0%, #aed581 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082619/uploads/fashions/women_Jeans.jpg' },
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
