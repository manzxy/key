import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
  userId: String,
  action: String,
  detail: String,
  date: { type: Date, default: Date.now }
});
export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivitySchema);
