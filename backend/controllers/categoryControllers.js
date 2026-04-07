import Category from '../models/Category.js';

export const getCategories = async (req, res)=>{
  try{
    const categories = await Category.find().sort({ _id: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  } 
}

export const createCategory = async(req, res) =>{
  try {
    const {name, icon, color} = req.body;
    const newCategory = new Category({ name, icon, color });
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}