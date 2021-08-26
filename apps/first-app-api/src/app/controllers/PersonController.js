import { Person } from '../models/Person';

module.exports = {
    async getPerson(req, res) {
        try {
            const { paginate = false, limit = 20, page = 1, order = "asc", sortBy = "createdAt", active = true } = req.query;
            let person;
            if(paginate === "true"){
                person = await Person.paginate({ active }, { page, limit: parseInt(limit), sort: {[sortBy]: order}});
            } else {
                person = await Person.find({ active }).sort({[sortBy]: order}).limit(parseInt(limit));
            }
            return res.json(person);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async addPerson(req, res) {
        try {
            const person = await Person.create(req.body);
            return res.json(person);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}