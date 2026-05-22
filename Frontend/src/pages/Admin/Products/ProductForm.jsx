import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { api } from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    brand: "",
    price: "",
    category: "",
    color: "",
    stock: "",
    rating: "",
    description: "",
    specifications: [], // Nayi field
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res?.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch Product (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`products/${productId}`);
          const product = res.data;

          setFormData({
            title: product?.title || "",
            thumbnail: null,
            brand: product?.brand || "",
            price: product?.price || "",
            category: product?.category || "",
            color: product?.color || "",
            stock: product?.stock || "",
            rating: product?.rating || "",
            description: product?.description || "",
            specifications: product?.specifications || [], // Specs load ho jayenge
          });

          setThumbnailPreview(product?.thumbnail);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProduct();
    }
  }, [productId, isEditMode]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // --- Specifications Logic Start ---
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const handleSpecChange = (index, field, val) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][field] = val;
    setFormData((prev) => ({ ...prev, specifications: updatedSpecs }));
  };

  const removeSpec = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, specifications: updatedSpecs }));
  };
  // --- Specifications Logic End ---

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // Append basic fields
      Object.keys(formData).forEach((key) => {
        if (key !== "specifications" && key !== "thumbnail") {
          data.append(key, formData[key]);
        }
      });

      // convert specification to stringify
      data.append("specifications", JSON.stringify(formData.specifications));

      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

      if (isEditMode) {
        await api.put(`products/${productId}`, data);
      } else {
        await api.post("products", data);
      }
      navigate("/admin");
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <div className="pf-container">
      <div className="pf-wrapper">
        <h1 className="pf-heading">{isEditMode ? "Update Product" : "Add New Product"}</h1>
        <form onSubmit={handleSubmit}>
          {/* Title & Image fields */}
          <div className="pf-group">
            <label>Product Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          <div className="pf-group">
            <label>Thumbnail Image *</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required={!isEditMode} />
            {thumbnailPreview && <img src={thumbnailPreview} alt="preview" className="pf-preview" />}
          </div>

          <div className="pf-grid">
            <div className="pf-group"><label>Brand *</label><input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required /></div>
            <div className="pf-group"><label>Price *</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required /></div>
          </div>

          <div className="pf-grid">
            <div className="pf-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select</option>
                {categories?.map((cat) => (<option key={cat._id} value={cat.slug}>{cat.title}</option>))}
              </select>
            </div>
            <div className="pf-group"><label>Color *</label><input type="text" name="color" value={formData.color} onChange={handleInputChange} required /></div>
          </div>

          <div className="pf-grid">
            <div className="pf-group"><label>Stock *</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required /></div>
            <div className="pf-group"><label>Rating *</label><input type="number" name="rating" value={formData.rating} onChange={handleInputChange} required /></div>
          </div>

         {/* specification feild */}
          <div className="pf-specs-section">
            <label className="pf-label-heading">Specifications</label>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="pf-spec-row">
                <input
                  type="text"
                  placeholder="Feature (e.g. RAM)"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  className="pf-spec-input"
                />
                <input
                  type="text"
                  placeholder="Detail (e.g. 16GB)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  className="pf-spec-input"
                />
                <button type="button" onClick={() => removeSpec(index)} className="pf-remove-spec">×</button>
              </div>
            ))}
            <button type="button" onClick={addSpecification} className="pf-add-spec-btn">
              + Add Specification
            </button>
          </div>

          <div className="pf-group">
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>

          <div className="pf-buttons">
            <button type="submit" className="pf-add-btn">
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};