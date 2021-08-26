import { Pet } from '../models/Pet';

module.exports = {
    async getPet(req, res) {
        try {
            const { paginate = false, limit = 20, page = 1, order = "asc", sortBy = "createdAt", active = true, person = '' } = req.query;
            let pet;
            if(paginate === "true"){
                pet = await Pet.paginate({ active, person }, { page, limit: parseInt(limit), sort: {[sortBy]: order}, populate: ['person']});
            } else {
                pet = await Pet.find({ active, person }).sort({[sortBy]: order}).limit(parseInt(limit)).populate('person');
            }
            return res.json(pet);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async addPet(req, res) {
        try {
            const pet = await Pet.create(req.body);
            return res.json(pet);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}