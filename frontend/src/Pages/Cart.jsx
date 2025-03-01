import { useEffect,useState } from 'react';
import NavBar from '../Components/navbar';
import CartProduct from '../Components/cartProduct';
const Cart = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/getcart`)
            .then((res) => {
                if (!res.ok) {
                    console.log("error in cart page");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data.cart.map(product=>({quantity:product['quantity'],...product['productId']})));
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
        </div>
        </>
    );
}
export default Cart;