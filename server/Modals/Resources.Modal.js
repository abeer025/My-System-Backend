import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['video', 'document', 'link', 'github', 'other'],
    },
    url: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    courseName: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: () => new Date(), // Sets the current date by default
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString(), // Sets the current time in a readable format
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const ResourceModal =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
