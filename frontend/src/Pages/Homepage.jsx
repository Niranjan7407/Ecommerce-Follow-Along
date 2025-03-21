import React,{useState,useEffect} from 'react';
import ProductCard from '../Components/ProductCard';
import axios from 'axios'
import NavBar from "../Components/navbar";






export default function Homepage() {
    

    const [productDetails,setProductDetails]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("")

    

    useEffect(()=>{
        const fetchProducts=async ()=>{
            axios.get("http://localhost:3000/product/get-products")
        .then((res)=>{
            // if (!res.ok){
            //     throw new Error(`HTTP Error! status:${res.status}`)
            // }
            return res.data
        }).then((data)=>{
            console.log(data)
            setProductDetails(data.products);
            setLoading(false);
            
        }).catch((err)=>{
            console.error(err)
            setError(err)
        })
        }
        fetchProducts()
        
    },[])

    return (
        <>
        <div className='w-screen h-screen'>
            <NavBar />
            <div className='grid grid-cols-5 gap-4  align-items-center'>
        {
            productDetails.map((product,index) => {
                return <ProductCard key={index} product={product} />
            })
        }
        </div>
        </div>
         
       
        </>
    )
}
