import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSubSchema = new Schema(
    {
      tmdbId: { 
        type: Number, 
        required: true, 
        index: true 
      },
      title: { 
        type: String, 
        required: true 
      },                  
      posterPath: { 
        type: String 
      },                  
      releaseDate: { 
        type: Date 
      },                  
      order: { 
        type: Number 
      },                  
    },
    { _id: false }
  );

const userListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    isRanked: {
        type: Boolean,
        default: false,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    movies: {
      type: [movieSubSchema],
      default: [],
    },
}, {
    timestamps: true,
});

export const UserList = mongoose.model("UserList", userListSchema);