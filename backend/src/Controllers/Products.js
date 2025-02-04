const {Router} = require('express')
const {productModel} = require('./../Model/productModel')
const {productUpload} = require('./../../multer')

const productRouter=Router();

productRouter.get('/',(req,res)=>{
    res.send('Product router')
})

productRouter.post('/',productUpload.array('files'),async (req,res)=>{
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

module.exports=productRouter;