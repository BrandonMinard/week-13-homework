const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const thingData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const thingData = await Category.findOne({
      where: { id: req.params.id },
      include: [Product]
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const name = req.body.name;
  try {
    const newTag = Category.build({ category_name: name })
    await newTag.save()
    res.status(200).json("Category created!");
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const newName = req.body.name
  try {
    await Category.update(
      { category_name: newName },
      { where: { id: parseInt(req.params.id) } }
    );
    res.status(200).json('Update succeess!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const thingData = await Category.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
