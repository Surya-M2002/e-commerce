import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'Smart Deals', subtitle: 'Phones & audio', cta: 'Shop Tech', to: '/electronics', gradient: 'linear-gradient(90deg,#e1bee7 0%, #ce93d8 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082528/uploads/electronics/Full_HD_TV.jpg' },
  { title: 'Home Essentials', subtitle: 'Appliances on offer', cta: 'View Offers', to: '/electronics', gradient: 'linear-gradient(90deg,#ffe0b2 0%, #ffcc80 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082524/uploads/electronics/Electric_Kettle.jpg' },
  { title: 'Computing Picks', subtitle: 'Laptops & accessories', cta: 'Browse', to: '/electronics', gradient: 'linear-gradient(90deg,#cfd8dc 0%, #b0bec5 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082543/uploads/electronics/pexels-thepaintedsquare-1666313-min.jpg' },
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
