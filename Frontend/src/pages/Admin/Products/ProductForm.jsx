import { useState, useEffect } from "react";
import "./ProductForm.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAddProduct, useUpdateProduct } from "../../../hooks/useProductAction";
import { useCategory } from "../../../hooks/useCategory";
import { useProduct, useSingleProduct } from "../../../hooks/useProduct";

export const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  // ADD, UPDATE AND DELETE PRODUCT HOOK
  const { mutate: addProductMutate, isPending: addProductPending } =
    useAddProduct();
  const { mutate: updateProductMutate, isPending: updateProductPending } =
    useUpdateProduct();

  // FETCH PRODUCTS AND CATEGORIES
  const { data: categories } = useCategory();
  const { data: products } = useProduct({
    search: "",
  });
  const { data: product, isLoading: isProductLoading } = useSingleProduct(
    productId,
    isEditMode,
  );

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
    specifications: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // FETCH PRODUCT (Edit Mode)
  useEffect(() => {
    if (product) {
      setFormData({
        title: product?.title || "",
        thumbnail: null,
        brand: product?.brand || "",
        price: product?.price || "",
        category: product?.category?._id || product?.category || "",
        color: product?.color || "",
        stock: product?.stock || "",
        rating: product?.rating || "",
        description: product?.description || "",
        specifications: product?.specifications || [],
      });

      setThumbnailPreview(product?.thumbnail);
    }
  }, [product]);

  //HANDLERS
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  //  ADD SPECIFICATION
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

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // HANDLE FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      updateProductMutate(
        { productId: productId, updateData: data },
        {
          onSuccess: () => {
            navigate("/admin/products");
          },
        },
      );
    } else {
      addProductMutate(data, {
        onSuccess: () => {
          navigate("/admin");
        },
      });
    }
  };

  return (
    <div className="pf-container">
      <div className="pf-wrapper">
        <h1 className="pf-heading">
          {isEditMode ? "Update Product" : "Add New Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title & Image fields */}
          <div className="pf-group">
            <label>Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="pf-group">
            <label>Thumbnail Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEditMode}
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="preview"
                className="pf-preview"
              />
            )}
          </div>

          <div className="pf-grid">
            <div className="pf-group">
              <label>Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="pf-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="pf-grid">
            <div className="pf-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required>
                <option value="">Select</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="pf-group">
              <label>Color *</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="pf-grid">
            <div className="pf-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="pf-group">
              <label>Rating *</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
              />
            </div>
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
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  className="pf-spec-input"
                />
                <input
                  type="text"
                  placeholder="Detail (e.g. 16GB)"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  className="pf-spec-input"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="pf-remove-spec">
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="pf-add-spec-btn">
              + Add Specification
            </button>
          </div>

          <div className="pf-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
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
