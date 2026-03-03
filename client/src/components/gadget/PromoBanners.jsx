import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'New Gadgets', subtitle: 'Latest tech arrivals', cta: 'Shop Now', to: '/gadget', gradient: 'linear-gradient(90deg,#b3e5fc 0%, #81d4fa 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767408746/Xiaomi_Lite_Action_Camera_zo7zib.jpg' },
  { title: 'Smart Savings', subtitle: 'Deals on accessories', cta: 'View Deals', to: '/gadget', gradient: 'linear-gradient(90deg,#c5cae9 0%, #9fa8da 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767408721/HP_Spectre_x360_rkh8ad.jpg' },
  { title: 'Weekend Offers', subtitle: 'Up to 35% off', cta: 'Grab Offer', to: '/gadget', gradient: 'linear-gradient(90deg,#ffcc80 0%, #ffb74d 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767408731/markus-spiske-E6_YgN0tsjM-unsplash_hkbuve.jpg ' },
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
