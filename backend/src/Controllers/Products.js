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