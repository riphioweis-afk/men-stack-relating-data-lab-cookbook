const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX - Show all items in user's pantry
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// NEW - Show form to add new item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// CREATE - Add new item to pantry
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// EDIT - Show form to edit item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', {
      food: food
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// UPDATE - Update item in pantry
router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId);
    food.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// DELETE - Remove item from pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;