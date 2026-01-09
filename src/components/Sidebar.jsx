import React from 'react';
import * as Icons from 'lucide-react';

export const Sidebar = ({ categories }) => (
  <div className="bg-white rounded-3 shadow-sm sidebar-sticky p-2" style={{position: 'sticky', top: '100px'}}>
    {categories.map((cat) => {
      const IconComp = Icons[cat.icon];
      return (
        <div key={cat.id} className="d-flex align-items-center p-3 rounded-2 cursor-pointer" style={{cursor: 'pointer'}}>
          <span className="me-3 text-muted">{IconComp && <IconComp size={18}/>}</span>
          <span className="small fw-bold">{cat.name}</span>
        </div>
      );
    })}
  </div>
);
export default Sidebar;