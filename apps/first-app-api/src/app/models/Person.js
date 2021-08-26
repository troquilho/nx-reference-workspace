const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
}, { timestamps: {} });

PersonSchema.plugin(mongoosePaginate);
const Person = mongoose.model('Person', PersonSchema, 'person');

module.exports = {
    Person
}