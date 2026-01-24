import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'Festive Gifts', subtitle: 'Make moments special', cta: 'Browse', to: '/gift', gradient: 'linear-gradient(90deg,#f7a7d8 0%, #f6b58b 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767409086/ekaterina-shevchenko-ZLTlHeKbh04-unsplash_xetsex.jpg' },
  { title: 'Kids Specials', subtitle: 'Toys & more', cta: 'Shop Kids', to: '/gift', gradient: 'linear-gradient(90deg,#ffd07a 0%, #ffb274 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767410284/parth-natani-Ja08OFQrC6U-unsplash_r6dvwc.jpg' },
  { title: 'Sweet Treats', subtitle: 'Chocolates & hampers', cta: 'Shop Treats', to: '/gift', gradient: 'linear-gradient(90deg,#ffb3a0 0%, #ff8f89 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767410289/Scented_Candle_qqabhh.jpg' },
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
