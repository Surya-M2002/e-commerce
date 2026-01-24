import React, { useState } from 'react';
import { X, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard'; 
import '../ProductModal.css';

const ProductModal = ({ product, isOpen, onClose, onAdd, onRemove, quantity, cart, onViewRelated, relatedProducts = [] }) => {
  const [activeImg, setActiveImg] = useState(null);
  const [isReadMore, setIsReadMore] = useState(false);

  if (!isOpen || !product) return null;

  const displayImg = activeImg || product.img || product.image || 'https://placehold.co/600x400?text=No+Image';

  const getQty = (id) => cart?.find((item) => item.id === id)?.quantity || 0;

  return (
    <div className="pb-modal-overlay" onClick={onClose}>
      <div className="pb-modal-content" onClick={(e) => e.stopPropagation()} key={product.id}>
        <button className="pb-modal-close" onClick={onClose}><X size={18} /></button>

        <div className="pb-modal-scroll-area">
          <div className="row m-0 border-bottom">
            <div className="col-lg-6 p-4 border-end bg-light d-flex flex-column align-items-center">
              <div className="main-display-img mb-4">
                <img src={displayImg} alt={product.name} className="img-fluid" style={{maxHeight:'350px'}} />
              </div>
              <div className="thumb-gallery d-flex gap-2">
                {[product.img || product.image || 'https://placehold.co/60x60?text=IMG', product.img || product.image || 'https://placehold.co/60x60?text=IMG'].map((img, idx) => (
                  <div key={idx} className={`thumb-item ${displayImg === img ? 'active' : ''}`} onClick={() => setActiveImg(img)}>
                    <img src={img} width="60" alt="thumb" />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 p-4 p-lg-5">
              <div className="d-flex justify-content-between">
                <h2 className="pb-title fs-3 fw-bold">{product.name}</h2>
                <Heart size={20} className="text-muted" />
              </div>
              <p className="pb-unit text-muted small">{product.unit}</p>
              <div className="pb-desc mt-3">
                <p className={`small text-muted ${!isReadMore ? 'truncate-3' : ''}`}>
                  {product.description || "Fresh products delivered to your doorstep in 90 minutes."}
                </p>
                <button className="read-more-btn text-success border-0 bg-transparent fw-bold p-0" onClick={() => setIsReadMore(!isReadMore)}>
                  {isReadMore ? 'Read Less' : 'Read More'}
                </button>
              </div>
              <div className="pb-price mt-4 fs-2 fw-bold text-success">${product.price.toFixed(2)}</div>
              
              <div className="mt-4">
                {quantity > 0 ? (
                  <div className="d-flex align-items-center bg-success text-white rounded p-1" style={{maxWidth:'140px'}}>
                    <button className="btn btn-sm text-white" onClick={() => onRemove(product)}><Minus size={14}/></button>
                    <span className="flex-grow-1 text-center fw-bold">{quantity}</span>
                    <button className="btn btn-sm text-white" onClick={() => onAdd(product)}><Plus size={14}/></button>
                  </div>
                ) : (
                  <button className="pb-add-to-cart border-0 text-white rounded px-4 py-2 fw-bold" onClick={() => onAdd(product)}>
                    <ShoppingBag size={18} className="me-2" /> Add To Shopping Cart
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 p-lg-5 bg-light">
            <h5 className="fw-bold mb-4">Related Products</h5>
            <div className="row g-3">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((p) => (
                  <div key={p.id} className="col-6 col-md-4 col-xl-3">
                    <ProductCard 
                      product={p} 
                      qty={getQty(p.id)} 
                      onAdd={() => onAdd(p)} 
                      onRemove={() => onRemove(p)}
                      onView={() => onViewRelated(p)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-4">
                  No similar products found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;
