const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const thingData = await Tag.findAll({
      include: [Product
        // {
        //   model: Tag,
        //   // as: tag_id,
        //   through: ProductTag
        // }
      ]
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const thingData = await Tag.findOne({
      where: { id: req.params.id },
      include: [Product]
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//body will have name, that's it
router.post('/', async (req, res) => {
  // create a new tag
  const name = req.body.name;
  try {
    const newTag = Tag.build({ tag_name: name })
    await newTag.save()
    res.status(200).json("Tag created!");
  } catch (err) {
    res.status(500).json(err);
  }



});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const newName = req.body.name
  try {
    await Tag.update(
      { tag_name: newName },
      { where: { id: parseInt(req.params.id) } }
    );
    res.status(200).json('Update succeess!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const thingData = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(thingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
