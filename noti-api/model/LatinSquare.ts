import mongoose, { Document, Schema } from 'mongoose';

// Define an interface that extends Document
interface ILatinSquare extends Document {
  index: number;
  currentOrder: number[];
}

// Create the Mongoose schema
const LatinSquareSchema: Schema<ILatinSquare> = new Schema({
  index: {
    type: Number,
    default: 1,
  },
  currentOrder: {
    type: [Number],
    default: [1, 2, 3, 4, 5, 6],
  },
});

// Create and export the Mongoose model
const LatinSquareModel = mongoose.model<ILatinSquare>('LatinSquare', LatinSquareSchema);

export default LatinSquareModel;
