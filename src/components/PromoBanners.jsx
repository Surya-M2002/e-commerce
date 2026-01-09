import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PromoBanners.css';

const banners = [
  {
    title: 'Gift Voucher',
    subtitle: 'With personal care items',
    cta: 'Shop Coupons',
    to: '/offers',
    gradient: 'linear-gradient(90deg,#f7a7d8 0%, #f6b58b 100%)',
    img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767843095/Screenshot_2026-01-08_083413_pznb1g.png',
  },
  {
    title: 'Free Delivery',
    subtitle: 'With selected items',
    cta: 'Save Now',
    to: '/offers',
    gradient: 'linear-gradient(90deg,#ffd07a 0%, #ffb274 100%)',
    img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767843095/Screenshot_2026-01-08_083529_drqgta.png',
  },
  {
    title: 'Coupon Savings',
    subtitle: 'Up to 40% off everyday essentials',
    cta: 'Shop Coupons',
    to: '/offers',
    gradient: 'linear-gradient(90deg,#ffb3a0 0%, #ff8f89 100%)',
    img: 'https://res.cloudinary.com/djfh1ooz6/image/upload/v1767843095/Screenshot_2026-01-08_083628_z01uon.png',
  },
];

export const PromoBanners = () => {
  const trackRef = useRef(null);
  const scrollBy = (delta) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="position-relative my-4">
      <button
        className="btn btn-light shadow-sm rounded-circle pb-promo-arrow pb-promo-arrow-left"
        onClick={() => scrollBy(-400)}
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        className="btn btn-light shadow-sm rounded-circle pb-promo-arrow pb-promo-arrow-right"
        onClick={() => scrollBy(400)}
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>

      <div ref={trackRef} className="pb-promo-track">
        {banners.map((b) => (
          <div key={b.title} className="pb-promo-card shadow-sm" style={{ background: b.gradient }}>
            <div className="p-4">
              <h5 className="pb-promo-title mb-1">{b.title}</h5>
              <p className="pb-promo-sub">{b.subtitle}</p>
              <Link to={b.to} className="btn btn-light rounded-pill fw-bold px-3 py-1">
                {b.cta}
              </Link>
            </div>
            <div className="p-3">
              <img src={b.img} alt="" className="pb-promo-img" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PromoBanners;
