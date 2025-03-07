import { useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"

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
    })

    useEffect(()=>{
        const c = [
            {
              productId: "12345",
              productName: "Wireless Headphones",
              quantity: 2,
              price: 99.99
            },
            {
              productId: "67890",
              productName: "Gaming Mouse",
              quantity: 1,
              price: 49.99
            },
            {
              productId: "11223",
              productName: "Mechanical Keyboard",
              quantity: 1,
              price: 129.99
            }
          ];
          setCart(c);
          
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
        <button className="border text-white bg-blue-500">Continue to Pay</button>
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