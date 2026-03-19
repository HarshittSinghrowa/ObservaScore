const mongoose = require('mongoose');

const pillarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  weight: { type: Number, required: true },
  criteria: [{
    label: String,
    value: Boolean,
    points: Number
  }]
});

const observaScoreSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  environment: {
    type: String,
    enum: ['development', 'staging', 'production'],
    default: 'development'
  },
  pillars: [pillarSchema],
  overallScore: { type: Number, required: true, min: 0, max: 100 },
  grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'] },
  maturityLevel: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
  recommendations: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate grade from score
observaScoreSchema.pre('save', function (next) {
  const s = this.overallScore;
  if (s >= 90) { this.grade = 'A'; this.maturityLevel = 'Platinum'; }
  else if (s >= 75) { this.grade = 'B'; this.maturityLevel = 'Gold'; }
  else if (s >= 60) { this.grade = 'C'; this.maturityLevel = 'Silver'; }
  else if (s >= 40) { this.grade = 'D'; this.maturityLevel = 'Bronze'; }
  else { this.grade = 'F'; this.maturityLevel = 'Bronze'; }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('ObservaScore', observaScoreSchema);
