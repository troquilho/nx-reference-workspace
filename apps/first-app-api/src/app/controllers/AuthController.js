module.exports = {
    async getHealth(req, res) {
        return res.status(200).send("API's working fine.");
    }
}