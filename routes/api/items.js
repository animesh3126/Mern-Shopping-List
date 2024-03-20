const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc  Get All Items
// @access Public
router.get('/', (_req, res) =>{
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route POST api/items
// @desc  Create An Item
// @access Public
router.post('/', (_req, res) =>{
    const newItem = new Item({
        name: _req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc  Delete A Item
// @access Public
// router.delete('/:id', (_req, res) => {
//     Item.findByIdAndDelete(_req.params.id)
//         .then(item => item.remove().then(() => res.json({ success: true })))
//         .catch(_err => res.status(404).json({ success: false }));
// });
// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(404).json({ success: false, message: "Item not found" });
            }
            res.json({ success: true, message: "Item deleted successfully" });
        })
        .catch(err => res.status(500).json({ success: false, message: err.message }));
});


module.exports = router;