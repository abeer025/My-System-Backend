import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      unique: true, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    duration: { 
      type: String, 
      required: true 
    },
    eligibility: [{ 
      type: String 
    }],
    thumbnail: { 
      type: String 
    },
    trainerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" // assuming you have a User model for trainers
    },
    trainerName: { 
      type: String, 
      required: true // trainerName is now required
    },
    enrolledStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    batch: { // New field for batch
      type: String, 
      required: true
    },
    section: { // New field for section
      type: String, 
      required: true
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const CourseModal =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
