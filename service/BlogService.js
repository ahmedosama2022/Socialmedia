const { default: mongoose } = require('mongoose');
const Blog = require('../moduls/BlogModule');
const User = require('../moduls/usermodule');
exports.getAllBolgs = async(req, res, next) => {
 let Blogs;
 try {
    Blogs = await Blog.find();

 } catch (error) {
    console.log(err)
 }
  if (!Blogs){
    return res.status(404).json({message: "No Users Found"})
  }
    return res.status(200).json({Blogs})
}


exports.AddBlog = async(req,res,next) => {
    const {title, description, image, user} = req.body;

    let existingUser;

    try{
      existingUser = await User.findById(user);
    }catch (err){
      return console.log(err)
    }
    if (!existingUser){
      return res.status(400).json({message: "Unable To Find User By This ID"})
    }
    const blog = new Blog({
        title, description,image, user
    });
   try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session})
    await session.commitTransaction();
   } catch (error) {
     console.log(error);
     return res.status(500).json({message:error})
   }
   return res.status(200).json({blog});
};


exports.ubdateBlog = async(req,res,next) => {
  const {title, description} = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description
    })
  } catch (error) {
    return console.log(error)
  }
  if(!blog){
    return res.status(500).json({message: "Unable To Update The Blog"})
  }
  return res.status(200).json({blog})
}


exports.getSingleBlog = async(req,res,next) => {
  const id = req.params.id;
  let blog;
  try{
    blog = await Blog.findById(id);
  }catch (err) {
    return console.log(err);
  }
  if(!blog){
    return res.status(404).json({message: "No Blog This Id"})
  }
  return res.status(200).json({blog})
}



exports.deleteBlog  = async(req, res,next) => {
  const {id} = req.params;
  
  const blog = await Blog.findByIdAndDelete(id).populate('user');
  await blog.user.blogs.pull(blog);
  await blog.user.save();
  if (!blog) {
    return res.status(404).json({message: "No This Blog"})
  }
  return res.status(200).json({message: "Successfully Delete"})
}
