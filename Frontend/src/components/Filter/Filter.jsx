import { useContext, useEffect, useRef, useState } from "react";
import "./Filter.css";
import { ProductContext } from "../../Context/ProductsContext";
import { api } from "../../api/axios";

export const Filter = ({ category }) => {
  const [selectedOption, setSelectOption] = useState("");
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [brandDropdownPos, setBrandDropdownPos] = useState({ top: 0, left: 0 });
  const [colorDropdownPos, setColorDropdownPos] = useState({ top: 0, left: 0 });

  const brandDropdownRef = useRef(null);
  const brandBtnRef = useRef(null);
  const colorDropdownRef = useRef(null);
  const colorBtnRef = useRef(null);

  const { getAllProduct } = useContext(ProductContext);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(e.target)) {
        setBrandDropdownOpen(false);
      }
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(e.target)) {
        setColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getAllProduct({
      category,
      sortBy: selectedOption,
      brand: checkedBrands.join(","),
      color: checkedColors.join(","),
      price: selectedPrice,
    });
  }, [selectedOption, checkedBrands, checkedColors, selectedPrice]);

  const handleOnSelect = (e) => setSelectOption(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);

  // Brand handlers
  const handleBrandCheck = (brand) => {
    setCheckedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  const clearBrands = () => setCheckedBrands([]);

  const toggleBrandDropdown = () => {
    if (!brandDropdownOpen && brandBtnRef.current) {
      const rect = brandBtnRef.current.getBoundingClientRect();
      setBrandDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
      });
    }
    setBrandDropdownOpen((prev) => !prev);
    setColorDropdownOpen(false); // close other
  };

  // Color handlers
  const handleColorCheck = (color) => {
    setCheckedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const clearColors = () => setCheckedColors([]);

  const toggleColorDropdown = () => {
    if (!colorDropdownOpen && colorBtnRef.current) {
      const rect = colorBtnRef.current.getBoundingClientRect();
      setColorDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
      });
    }
    setColorDropdownOpen((prev) => !prev);
    setBrandDropdownOpen(false); // close other
  };

  const getBrands = async () => {
    try {
      const res = await api.get(`products/filter?category=${category}&type=brand`);
      setBrands(res?.data?.options || []);
    } catch (error) {
      console.log(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const getColors = async () => {
    try {
      const res = await api.get(`products/filter?category=${category}&type=color`);
      setColors(res?.data?.options || []);
    } catch (error) {
      console.log(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getBrands();
    getColors();
  }, [category]);

  const ChevronIcon = ({ open }) => (
    <svg
      className={`chevron ${open ? "rotated" : ""}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    <div className="filter-panel-wrapper">
      <div className="filter-panel">

        {/* Sort */}
        <div className="filter-item">
          <select className="filter-select" value={selectedOption} onChange={handleOnSelect}>
            <option value="">Sort By</option>
            <option value="New">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {/* Price */}
        <div className="filter-item">
          <select className="filter-select" value={selectedPrice} onChange={handlePriceChange}>
            <option value="">Price</option>
            <option value="100-1000">₹100 – ₹1,000</option>
            <option value="1000-5000">₹1,000 – ₹5,000</option>
            <option value="5000-15000">₹5,000 – ₹15,000</option>
          </select>
        </div>

        {/* Color - Checkbox Dropdown */}
        <div className="filter-item" ref={colorDropdownRef}>
          <button
            ref={colorBtnRef}
            className={`filter-select brand-trigger ${colorDropdownOpen ? "open" : ""}`}
            onClick={toggleColorDropdown}
            type="button"
          >
            <span>
              {checkedColors.length > 0 ? `Color (${checkedColors.length})` : "Color"}
            </span>
            <ChevronIcon open={colorDropdownOpen} />
          </button>

          {colorDropdownOpen && (
            <div
              className="brand-dropdown"
              style={{
                position: "fixed",
                top: colorDropdownPos.top,
                left: colorDropdownPos.left,
                zIndex: 9999,
              }}
            >
              {checkedColors.length > 0 && (
                <div className="brand-dropdown-header">
                  <span>{checkedColors.length} selected</span>
                  <button className="clear-brands-btn" onClick={clearColors} type="button">
                    Clear
                  </button>
                </div>
              )}
              <div className="brand-list">
                {colors.length === 0 ? (
                  <p className="no-brands">No colors available</p>
                ) : (
                  colors.map((color, index) => (
                    <label key={index} className="brand-option">
                      <input
                        type="checkbox"
                        className="brand-checkbox"
                        checked={checkedColors.includes(color)}
                        onChange={() => handleColorCheck(color)}
                        value={color}
                      />
                      {/* Color dot */}
                      <span
                        className="color-dot"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span className="brand-name">{color}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Brand - Checkbox Dropdown */}
        <div className="filter-item" ref={brandDropdownRef}>
          <button
            ref={brandBtnRef}
            className={`filter-select brand-trigger ${brandDropdownOpen ? "open" : ""}`}
            onClick={toggleBrandDropdown}
            type="button"
          >
            <span>
              {checkedBrands.length > 0 ? `Brands (${checkedBrands.length})` : "Brand"}
            </span>
            <ChevronIcon open={brandDropdownOpen} />
          </button>

          {brandDropdownOpen && (
            <div
              className="brand-dropdown"
              style={{
                position: "fixed",
                top: brandDropdownPos.top,
                left: brandDropdownPos.left,
                zIndex: 9999,
              }}
            >
              {checkedBrands.length > 0 && (
                <div className="brand-dropdown-header">
                  <span>{checkedBrands.length} selected</span>
                  <button className="clear-brands-btn" onClick={clearBrands} type="button">
                    Clear
                  </button>
                </div>
              )}
              <div className="brand-list">
                {brands.length === 0 ? (
                  <p className="no-brands">No brands available</p>
                ) : (
                  brands.map((brand, index) => (
                    <label key={index} className="brand-option">
                      <input
                        type="checkbox"
                        className="brand-checkbox"
                        checked={checkedBrands.includes(brand)}
                        onChange={() => handleBrandCheck(brand)}
                        value={brand}
                      />
                      <span className="brand-name">{brand}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};