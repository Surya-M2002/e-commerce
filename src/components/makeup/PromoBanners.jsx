import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../PromoBanners.css';

const banners = [
  { title: 'New Arrivals', subtitle: 'Glow up with us', cta: 'Shop Now', to: '/makeup', gradient: 'linear-gradient(90deg,#f8bbd0 0%, #f48fb1 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767412975/Moisturizer_lamcyv.jpg' },
  { title: 'Best Sellers', subtitle: 'Top rated products', cta: 'View Deals', to: '/makeup', gradient: 'linear-gradient(90deg,#e1bee7 0%, #ce93d8 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767412992/pexels-suzyhazelwood-1327689_gha6zb.jpg' },
  { title: 'Skincare Sets', subtitle: 'Care for your skin', cta: 'Grab Offer', to: '/makeup', gradient: 'linear-gradient(90deg,#ffcdd2 0%, #ef9a9a 100%)', img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767082722/uploads/makeup/Shaving_Cream.jpg' },
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
