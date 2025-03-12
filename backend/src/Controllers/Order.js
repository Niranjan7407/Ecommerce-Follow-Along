const {Router}=require('express');
const auth = require('../Middleware/auth');
const user=require("../Model/userModel");
const orders = require('../Model/OrderSchema');
const orderrouter=Router()

orderrouter.post('/place',auth,async(req,res)=>{
    try {

        const email=req.user
        const {  orderItems, shippingAddress } = req.body;

        // Validate request data
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required.' });
        }
        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required.' });
        }

        // Retrieve user _id from the user collection using the provided email
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Create separate orders for each order item
        const orderPromises = orderItems.map(async (item) => {
            const totalAmount = item.price * item.quantity;
            const order = new orders ({
                user: user._id,
                orderItems: [item], // Each order contains a single item
                shippingAddress,
                totalAmount,
            });
            return order.save();
        });

        const orders = await Promise.all(orderPromises);

        
      const arr=user.cart
      arr.splice(o,arr.length)

        res.status(201).json({ message: 'Orders placed and cart cleared successfully.', orders });
    } catch (error) {
        console.error('Error placing orders:', error);
        res.status(500).json({ message: error.message });
    }
})



orderrouter.get("/getorder",auth,async(req,res)=>{
    try{
      const email=req.user
      if(!email){
        return res.status(404).json({message:"not found "})
      }
     const orderhistory=await orders.find({email})

     console.log(orderhistory)
    res.status(200).json({message:"placed successfully"})
    }
    catch(err){
        console.log(err)
    }
})


module.exports=orderrouter