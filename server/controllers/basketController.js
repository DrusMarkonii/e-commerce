const { Basket } = require("../models/models");

class BasketController {
  async add(req, res) {
    const { device } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new BasketController();
