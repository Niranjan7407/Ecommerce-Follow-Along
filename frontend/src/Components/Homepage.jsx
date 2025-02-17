import React,{useState} from 'react';
import ProductCard from './ProductCard';
import axios from 'axios'
import NavBar from "../Components/navbar";

const productDetails=[
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 1',
        price:100,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 2',
        price:150,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 3',
        price:300,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 4',
        price:150,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 5',
        price:300,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 1',
        price:100,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 2',
        price:150,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 3',
        price:300,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 4',
        price:150,
        description:'This is a product'
    },
    {
        image:["https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_1280.jpg","https://cdn.pixabay.com/photo/2022/01/03/19/39/flag-6913477_1280.jpg","https://cdn.pixabay.com/photo/2017/07/02/00/43/bundestag-2463236_1280.jpg",'https://picsum.photos/150'],
        name:'Product 5',
        price:300,
        description:'This is a product'
    }
    
]




export default function Homepage() {
    const [productDetails,setProductDetails]=useState([])
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("")

    useEffect(()=>{
        async ()=>{
            await axios.fetch("http://localhost:3000/product/get-products")
        .then((res)=>{
            if (!res.ok){
                throw new Error(`HTTP Error! status:${res.status}`)
            }
            return res.json()
        }).then((data)=>{
            setProductDetails(data.products);
            setLoading(false);
            
        }).catch((err)=>{
            console.error(err)
            setError(err)
        })
        }
        
    })

    return (
        <>
         <NavBar />
        <div className='grid grid-cols-5 gap-4  align-items-center'>
        {
            productDetails.map((product,index) => {
                return <ProductCard key={index} product={product} />
            })
        }
        </div>
       
        </>
    )
}
