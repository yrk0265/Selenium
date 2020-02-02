const mongoose=require('mongoose');
const ChartSchema = mongoose.Schema({
    _id:String,
    Legend: String,
    Value: Number,
    Month: String
});
module.exports = mongoose.model('Charts', ChartSchema);