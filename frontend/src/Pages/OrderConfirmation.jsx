import { useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderConfirmation=()=>{
    const location=useLocation();
    const {selectedAddress}=location.state;
    const [cart,setCart]=useState([]);
    const [total,setTotal]=useState(0);

    // useEffect(()=>{
    //     axios.get("http://localhost:3000/get-cart")
    //     .then(response=>{
    //         console.log(response.data);
    //         setCart(response.data.cart);
    //     })
    // },[])

    useEffect(()=>{
        document.body.style.backgroundColor='white'
        document.body.style.color='black'
    },[])

    useEffect(()=>{
        axios.get('http://localhost:3000/product/getcart',{headers:{Authorization:localStorage.getItem('token')}}).then((res)=>{
            setCart(res.data.cart)
        }).catch((err)=>{
            console.log(err)
        })

          
        },[])
          

    useEffect(()=>{
        let to=0;
            cart.forEach(product=>{
            to+=product.price*product.quantity;
            })
        setTotal(to);
    },[cart])

    return(
        
        <>
        {
            cart.length>0 && 
            <><div>
            <h2>Selected Address:</h2>
            <p>{selectedAddress.address1}, {selectedAddress.address2}</p>
            <p>{selectedAddress.city}, {selectedAddress.country} - {selectedAddress.zipCode}</p>
        </div>
        <div>
            {cart.map((product)=>{
                return(
                    <div key={product.productId} className="border border-black p-4 m-4">
                        <h3>{product.productName}</h3>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                )
            })}
        </div>
        <div>
            <h2>Checkout:</h2>
            <h2>Total: {total.toFixed(2)}</h2>
        </div>
        q
        <PayPalScriptProvider options={{ clientId: "Ae0JbHznWDQX53hPGsAEampnhjtEBoYj-3o-HU3RR0c7ziKPciKtG8jb2opiqi8yx3MkSYNFuin_6JEx" }}>
                              <PayPalButtons style={{ layout: "horizontal" }} 
                                  createOrder={(data,actions)=>{
                                     return actions.order.create({purchase_units:[{amount:{value:total.toFixed(2)}}]})
                                  }}
                                  onApprove={async(data,actions)=>{
                                    const order1= actions.order.capture()
                                    try{
                                    const response=await axios.post('http://localhost:3000/order/verify-payment',{orderId:order1.id})

                                   if(response.data.success){
                                    onSuccess()
                                   }

                                    }catch(err){
                                        console.log(err)
                                    }

                                  }}
                              >Pay with paypal </PayPalButtons>
                         </PayPalScriptProvider>
        </>
        }
        {
            cart.length===0 && <div>
                Cart is Empty
            </div>
        }
        </>
    )
}

export default OrderConfirmation;