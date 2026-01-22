import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const CategoryBar = ({ categories = [], iconMap = {}, activeId, onSelect }) => {
  return (
    <div className="d-lg-none px-3 mt-3">
      <div className="d-flex gap-2" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || iconMap[cat.id] || FaShoppingBag;
          const active = activeId === cat.id;
          return (
            <button
              key={cat.id}
              className={`btn ${active ? 'btn-success' : 'btn-light'} d-flex align-items-center gap-2 rounded-pill`}
              style={{ width: 120, height: 44, padding: '6px 10px' }}
              onClick={() => onSelect && onSelect(cat.id)}
            >
              <Icon size={16} />
              <span className="fw-semibold" style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
