const {Router} = require('express')
const productModel = require('./../Model/productModel')
const {productUpload} = require('./../../multer')
const path = require('path');

const productRouter=Router();

productRouter.get('/get-products',async (req,res)=>{
    try{
        const products = await productModel.find({})
        if (!products){
            return res.status(400).json({message:"No products foud"})
        }
        console.log(products)
        return res.status(200).json({products:products})
    }catch(err){
        console.log(err)
    }
})

productRouter.post('/post-product',productUpload.array('files'),async (req,res)=>{
    const {name,email,description,category,stock,tags,price} = req.body;
    const images=req.files.map(file=>file.path);
    try{
        const seller = await productModel.findOne({email:email});
        if (!seller){
            return res.status(400).json({message:"Seller not found"})
        }
        if (images.length===0){
            return res.status(400).json({message:"Please upload atleast one images"})
        }
        const newProduct = await productModel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        })

        res.status(200).json({message:"Product created successfully",product:newProduct})
    }catch(err){
        console.log(err)
    }

})

productRouter.post("/cart", async(req, res) => {
    const {email, id, name, quantity} = req.body;

    try {
        if (!email || !id || !name || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const findEmail = await userModel.findOne({ email: "email"})
        if (!findEmail) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!mongoose.types.objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        if (quantity > 0 && !quantity) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const findProduct = await productModel.findById(productId);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cartProduct = await userModel.cart.findIndex((i) => {
            return i.productId === productId
        })
    }
    catch (error) {
        console.log(error);
    }
})



productRouter.put('/edit-product/:id',productUpload.array("files",10),async (req,res)=>{
    try{
    const {id}=req.params;
    const exis=await productModel.findById(id);
    
    if (!exis){
        res.status(400).json({message:"Product not found."})
    }
    const updateImages=exis.images;
    if (req.files && req.files.length>0){
        updateImages=req.files.map((img)=>{
            return `/product/${path.basename(img)}`
        })
    }
    const {name, description, category, tags, price, stock, email} = req.body;
    
    exis.name=name;
    exis.description=description;
    exis.category=category;
    exis.tags=tags;
    exis.price=price;
    exis.stock=stock;
    exis.email=email;
    exis.images=updateImages;

    await exis.save();

    res.status(200).json({message:"Product Updated",product:exis})
    }catch(err){
        console.log(err)
    }

}) 

productrouter.delete('/delete-product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const existproduct=await productModel.findById(id)

        if(!existproduct){
            res.status(400).json({message:"product does not exist"})
        }

        await existproduct.deleteOne()

    }catch(err){
        console.log('error in delete')
    }
})

module.exports=productRouter;