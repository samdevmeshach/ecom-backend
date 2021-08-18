const express = require("express")
const router = express.Router();
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {create,productById,read,remove,update,list,listRelated,listCategories,listBySearch,photo,listSearch,listAllProduct} = require("../controllers/product")

router.get("/product/:productId",read)
router.get("/products/search",listSearch)
router.post("/product/create/:userId",requireSignin,isAdmin,isAuth,create)
router.delete("/product/:productId/:userId",requireSignin,isAdmin,isAuth,remove)
router.put("/product/:productId/:userId",requireSignin,isAdmin,isAuth,update)
router.get("/products",list)
router.get("/allproducts",listAllProduct)
router.get("/products/related/:productId", listRelated)
router.get("/products/categories",listCategories)
router.post("/products/by/search",listBySearch)
router.get("/product/photo/:productId",photo)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router