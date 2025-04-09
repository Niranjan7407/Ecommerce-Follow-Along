const {Router} = require('express')
const productModel = require('./../Model/productModel')
const {productUpload} = require('./../../multer')
const auth=require('./../Middleware/Auth')
const userModel = require('./../Model/userModel')
const path = require('path');
const mongoose = require('mongoose');

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

productRouter.get('/get-my-products',auth,async (req,res)=>{
    try{
        console.log(req.user)
        const {email}=req.user
        const products = await productModel.find({email:email})
        if (products.length === 0){
            return res.status(400).json({message:"No products foud"})
        }
        console.log(products)
        return res.status(200).json({products:products})
    }catch(err){
        console.log(err)
    }   
})

// productRouter.patch('/edit-cart',auth,async (req,res)=>{
//     try{
//         const {productId,quantity}=req.body;
        
//         if ( !productId || quantity===undefined){
//             return res.status(400).json({message:"Please provide all fields"})
//         }
//         const findUser = await userModel.findOne({email:req.user.email})
//         if (!findUser){
//             return res.status(400).json({message:"User not found"})
//         }
//         const findProduct = await productModel.findById(productId)
//         if (!findProduct&&findProduct.stock<quantity){
//             return res.status(400).json({message:"Product not found or out of stock"})
//         }

//         const findCartProduct=findUser.cart.findIndex((item)=>item.productId.toString()===productId.toString())
//         if (findCartProduct!==-1){
//             findUser.cart[findCartProduct]=quantity;
//         }else{
//             findUser.cart.push({productId:productId,quantity:quantity})
//         }
//         await findUser.save()
//         return res.status(200).json({message:"Cart updated successfully"})
//     }catch(err){
//         console.log(err)
//     }
// })

productRouter.post('/post-product',productUpload.array('files'),async (req,res)=>{
    const {name,email,description,category,stock,tags,price} = req.body;
    const images=req.files.map(file=>file.path);
    try{
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

productRouter.patch("/cart",auth, async(req, res) => {
    const {id, quantity} = req.body;

    try {
        if ( !id ||  !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const findEmail = req.user
        if (!findEmail) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        if (quantity < 0 || !quantity) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const findProduct = await productModel.findById(id);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const findUser = await userModel.findOne({ email: findEmail.email });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartIndex = findUser.cart.findIndex((item) => item.productId.toString() === id);
        if (cartIndex !== -1) { 
            findUser.cart[cartIndex].quantity = quantity;
            findUser.cart[cartIndex].price = findProduct.price * quantity;
        } else {
            findUser.cart.push({ productId: id,productImages:findProduct.images,productName: findProduct.name, quantity: quantity,price:findProduct.price*quantity });
        }
        await findUser.save();
        return res.status(200).json({ message: "Product added to cart" });  
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

productRouter.get("/getcart",auth, async(req, res)=>{
    try{
        if (!req.user) {
            return res.status(404).json({message:"user does not exist"});
        }
        const user = await userModel.findOne({email:req.user.email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({cart:user.cart});
    }
    catch (error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
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

productRouter.delete('/delete-product/:id',async(req,res)=>{
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

productRouter.get('/get-product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await productModel.findById(id)
        if(!product){
            res.status(400).json({message:"Product not found"})
        }
        res.status(200).json({product:product})
    }catch(err){
        console.log(err)
    }
})

module.exports=productRouter;