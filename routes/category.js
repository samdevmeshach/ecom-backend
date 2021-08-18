const express = require("express")
const router = express.Router();
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {create,categoryById,remove,read,update,list} = require("../controllers/category");
const category = require("../models/category");

router.get("/category/:categoryId",read)
router.post("/category/create/:userId",requireSignin,isAdmin,isAuth,create)
router.put("/category/:categoryId/:userId",requireSignin,isAdmin,isAuth,update)
router.delete("/category/:categoryId/:userId",requireSignin,isAdmin,isAuth,remove)
router.get("/categories",list)

router.param('categoryId',categoryById); 
router.param('userId', userById);

module.exports = router 