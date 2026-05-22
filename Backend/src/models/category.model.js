import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),uppercase: true,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true });


// auto-generate slug
categorySchema.pre("save", function () {
    if (this.title) {
        this.slug = this.title.toLowerCase().replaceAll(" ", "-");
    }

});

export const Category = mongoose.model('Category', categorySchema);