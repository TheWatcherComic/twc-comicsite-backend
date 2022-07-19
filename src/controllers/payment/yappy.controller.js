const { json } = require("express");

class YappyController {
    async generateUrlMethod(req, res) {
        res.status(200).send("hi");
    }
}
module.exports = YappyController;   