import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgg from './../assets/bg_regis.jpg'

export const Productform = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [tag, setTag] = useState('');
    const [email, setEmail] = useState('');

    const [preview, setPreview] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(()=>{
        document.getElementsByTagName('body')[0].style.backgroundImage=`url(${bgg})`
    })

    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setImage((prev) => [...prev, ...files]);
        const img = files.map((file) => URL.createObjectURL(file));
        setPreview(img);
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('tag', tag);

        image.forEach((file) => {
            formData.append('image', file);
        });

        console.log(formData);
        alert('Product added successfully');

        const res = await axios.post('http://localhost:3000/product/post-product', formData);

        if (res.status === 200) {
            setName('');
            setEmail('');
            setPrice('');
            setDescription('');
            setCategory('');
            setStock('');
            setTag('');
            setImage([]);
            setPreview([]);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen text-black'>
            <div className='form-container bg-white p-4 rounded-lg shadow-lg w-96 display flex justify-center items-center flex-col'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold mb-4 '>Add Product</h1>
                <div className="div-email mt-1 ">
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-name mt-1 ">
                    <label>Name</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your name"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-price mt-1 ">
                    <label>Price</label>
                    <input
                        type="number"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter the price"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-description mt-1 ">
                    <label>Description</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Enter a description"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-category mt-1 ">
                    <label>Category</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        placeholder="Enter the category"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-stock mt-1 ">
                    <label>Stock</label>
                    <input
                        type="number"
                        required
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        placeholder="Enter stock available"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-tag mt-1 ">
                    <label>Tag</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
                        placeholder="Enter the tag"
                        className='border border-gray-500 rounded-md p-1 w-full mt-1 bg-indigo-50'
                    />
                </div>

                <div className="div-image mt-1 ">
                    <label>Product Image</label>
                    <input
                        type="file"
                        multiple
                        required
                        onChange={handleImage}
                        className='mt-1 '
                    />
                </div>

                <div>
                    <button type="submit" className='bg-indigo-500 rounded-md p-2 w-full mt-4 text-white'>Submit</button>
                </div>

                <div className="div-preview">
                    {preview.map((img, index) => (
                        <img src={img} alt="preview" key={index} />
                    ))}
                </div>
            </form>
        </div>
        </div>
    );
};