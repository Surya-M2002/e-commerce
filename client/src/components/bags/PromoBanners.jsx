import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'Stylish Bags', subtitle: 'Carry with confidence', cta: 'Shop Now', to: '/bags', gradient: 'linear-gradient(90deg,#bbdefb 0%, #90caf9 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082275/uploads/bags/with-mahdy-s0dKoyfaqtw-unsplash.jpg' },
  { title: 'Travel Ready', subtitle: 'Durable luggage picks', cta: 'View Deals', to: '/bags', gradient: 'linear-gradient(90deg,#ffe082 0%, #ffca28 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082265/uploads/bags/mobina-ghazazani-lnbuoKz2GlM-unsplash.jpg' },
  { title: 'Wallet Essentials', subtitle: 'Minimal and sleek', cta: 'Browse', to: '/bags', gradient: 'linear-gradient(90deg,#c5e1a5 0%, #aed581 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082261/uploads/bags/josiah-weiss-8sjBzL1IyMo-unsplash.jpg' },
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

