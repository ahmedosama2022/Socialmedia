const express = require("express");
const {getAllBolgs, AddBlog, ubdateBlog, getSingleBlog,deleteBlog} = require("../service/BlogService")
const router = express.Router();

router.route('/getAllBolgs').get(getAllBolgs)
router.route('/AddBlog').post(AddBlog)
router.route('/ubdateBlog/:id').put(ubdateBlog)
router.route('/getSingleBlog/:id').get(getSingleBlog)
router.route('/deleteBlog/:id').delete(deleteBlog)
module.exports = router;