import React from 'react';
import ProductCard from './ProductCard';


const productDetails=[
    {
        image:'https://picsum.photos/150',
        name:'Product 1',
        price:100,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 2',
        price:150,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 3',
        price:300,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 4',
        price:150,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 5',
        price:300,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 1',
        price:100,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 2',
        price:150,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 3',
        price:300,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 4',
        price:150,
        description:'This is a product'
    },
    {
        image:'https://picsum.photos/150',
        name:'Product 5',
        price:300,
        description:'This is a product'
    }
    
]

export default function Homepage() {
    return (
        <>
        
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
