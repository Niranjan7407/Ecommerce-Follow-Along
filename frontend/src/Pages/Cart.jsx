import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/navbar';
import CartProduct from '../Components/cartProduct';
import axios from 'axios';
const Cart = () => {
    const navigate=useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundImage="";
        document.getElementsByTagName('body')[0].style.backgroundColor="#F0FFFF";
        axios.get(`https://ecommerce-follow-along-4ev4.onrender.com/product/getcart`,{headers:{"Authorization":localStorage.getItem("token")}})
            .then((res) => {
                if (res.status!==200) {
                    console.log("error in cart page");
                }
                console.log(res.data)
                return res.data;
            })
            .then((data) => {
                setProducts(data.cart);
                console.log("Products fetched:",data.cart);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
        
            });
    }, []);

    console.log("Products:",products);

    return (
        <>
        <NavBar />
        <div className='w-full h-screen'>
            <div className='w-full h-full justify-center items-center flex'>
                <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col'>
                    <div className='w-full h-16  flex items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Cart</h1>
                    </div>
                    <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-2'>
                        {
                            products.map(product => (      
                                <CartProduct key={product._id} {...product} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <button className='bg-red-500 text-white' onClick={()=>navigate('/select-address',{state:{email:"niranjan.r.s67@kalvium.community"}})}>Place Order</button>
        </div>
        </>
    );
}
export default Cart;