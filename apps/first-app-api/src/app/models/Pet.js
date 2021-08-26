const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PetSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: "Person", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
}, { timestamps: {} });

PetSchema.plugin(mongoosePaginate);
const Pet = mongoose.model('Pet', PetSchema, 'pet');

module.exports = {
    Pet
}