import React, { useState } from "react";
import { api } from "../../../api/axios";
import "./CategoryForm.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const CategoryForm = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
  });

  // MUTATION FOR ADD CATEGORY
  const { mutate: addCategoryMutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("categories", data);
    },
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // text fields
    data.append("title", formData.title);
    data.append("thumbnail", formData.thumbnail);

    addCategoryMutate(data, {
      onSuccess: () => {
        navigate("/admin/categories");
      },
    });
    
    setFormData({
      title: "",
      thumbnail: null,
    });

    setThumbnailPreview(null);
  };

  return (
    <div className="cf-container">
      <div className="cf-wrapper">
        <h1 className="cf-heading">Add New Category</h1>

        <form onSubmit={handleSubmit}>
          <div className="cf-group">
            <label>Category Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter category title"
              required
            />
          </div>

          <div className="cf-group">
            <label>Thumbnail Image *</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <p className="cf-help">Supported formats: JPG, PNG, GIF</p>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="preview"
                className="cf-preview"
              />
            )}
          </div>

          <div className="cf-buttons">
            <button type="submit" className="cf-add-btn">
              Add Category
            </button>
            <button
              type="reset"
              className="cf-reset-btn"
              onClick={() => setThumbnailPreview(null)}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
