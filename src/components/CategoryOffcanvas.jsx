import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { fetchCategories } from "../utils/apiClient";

const CategoryOffcanvas = ({ activeCategoryId, onSelect }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchCategories('grocery');
      setCategories(data);
    })();
  }, []);
  return (
    <>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="pbCategoryOffcanvas" aria-labelledby="pbCategoryLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="pbCategoryLabel">Filter</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeCategoryId ? "" : "fw-bold text-success"}`}
              data-bs-dismiss="offcanvas"
              onClick={() => onSelect(null)}
            >
              All Categories
            </button>
            {categories.map((cat) => {
              const Icon = LucideIcons[cat.icon] || LucideIcons.Package;
              return (
                <button
                  key={cat.id}
                  className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${activeCategoryId === cat.id ? "fw-bold text-success" : ""}`}
                  data-bs-dismiss="offcanvas"
                  onClick={() => onSelect(cat.id)}
                >
                  <Icon size={18} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="pbSiteOffcanvas" aria-labelledby="pbSiteLabel">
        <div className="offcanvas-header">
         
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group">
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas" onClick={() => navigate("/")}>Home</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas" onClick={() => navigate("/offers")}>Offers</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas" onClick={() => navigate("/contact")}>Contact</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas" onClick={() => navigate("/shops")}>Shops</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Flash Sale</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Manufacturer/Publisher</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Authors</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">FAQ</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Terms & Conditions</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Customer Refund Policy</button>
            <button className="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">Vendor Refund Policy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryOffcanvas;
