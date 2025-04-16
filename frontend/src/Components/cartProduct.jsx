import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import {MdOutlineRemoveCircleOutline } from "react-icons/md";
export default function CartProduct({ productId,productImages, productName, quantity, price }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [quantityVal, setQuantityVal] = useState(quantity);
	
	const handleIncrement = () => {
		const newquantityVal = quantityVal + 1;
        setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
	};
	const handleDecrement = () => {
        const newquantityVal = quantityVal > 0 ? quantityVal - 1 : 1;
		setQuantityVal(newquantityVal);
        updateQuantityVal(newquantityVal);
        if (newquantityVal===0){
            window.location.reload();
        }
	};
    useEffect(() => {
        console.log(productImages);
            if (productImages.length <= 1) return; // No need to rotate if there's only one image
            const interval = setInterval(() => {
                setCurrentIndex((prev) => {
                    console.log(prev + 1);
                    return (prev + 1)%(productImages.length-1) ;
                });
            }, 2000);
            
            return () => clearInterval(interval); // Cleanup when unmounting
        }, [currentIndex]);
    const updateQuantityVal = (quantity) => {
        axios.patch('http://localhost:3000/product/cart', {
            id: productId,
            quantity:quantity,
        },{headers:{"Authorization":localStorage.getItem("token")}})
        .then((res) => {
            if (res.status!==200) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.data;
        })
        .then((data) => {
            console.log('quantityVal updated:', data);
        })
        .catch((err) => {
            console.error('Error updating quantityVal:', err);
        });
    };
	
	return (
        <div className="h-max w-full p-4 flex justify-between border-b border-neutral-300 bg-neutral-100 rounded-lg text-black">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-x-2 md:hidden">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAddCircleOutline />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <MdOutlineRemoveCircleOutline/>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
                <div className="h-24 w-24 bg-gray-200 rounded-lg">
                <img 
    src={`http://localhost:3000/${productImages[currentIndex].replace(/\\/g, "/")}`} 
    alt={productId} 
    className="object-scale-down rounded-md"
/>
                </div>
                <p className="text-lg font-semibold">{productName}</p>
                <p className="text-lg font-semibold">${price*quantityVal}</p>
                <div className="hidden md:flex flex-row items-center gap-x-2 ">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAddCircleOutline  />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        < MdOutlineRemoveCircleOutline/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}