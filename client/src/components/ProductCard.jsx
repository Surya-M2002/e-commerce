import React from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ProductCard = ({ product, qty, onAdd, onRemove, onView }) => (
  <div className="card product-card border-0 shadow-sm h-100" onClick={onView}>
    {product.discount && <div className="discount-tag">{product.discount}</div>}
    <div className="p-4 text-center">
      <img src={product.img} alt={product.name} className="img-fluid rounded" style={{ height: 140, width: '100%', objectFit: 'cover' }} />
    </div>
    <div className="card-body pt-0 d-flex flex-column">
      <h6 className="fw-bold mb-1" style={{ minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h6>
      <p className="text-muted small mb-3">{product.unit}</p>
      <div className="mt-auto d-flex justify-content-between align-items-center">
        <span className="fw-bold text-success">{formatINR(product.price)}</span>
        <div style={{width:'90px'}} onClick={e => e.stopPropagation()}>
          {qty > 0 ? (
            <div className="qty-pill">
              <button onClick={onRemove}><Minus size={14}/></button>
              <span className="small fw-bold">{qty}</span>
              <button onClick={onAdd}><Plus size={14}/></button>
            </div>
          ) : (
            <button className="btn-cart-init" onClick={onAdd}><ShoppingBag size={14} className="me-1"/> Cart</button>
          )}
        </div>
      </div>
    </div>
  </div>
);
export default ProductCard;
