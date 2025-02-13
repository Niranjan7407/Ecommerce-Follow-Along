import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';



export default function ProductCard({product}) {

    useEffect(()=>{
        document.body.style.backgroundColor='azure'
      })
    
      
    const [imgIndex,setImgIndex] = useState(0);

    const navigate=useNavigate()

    const handleEdit=(id)=>{
        navigate(`/product/${id}`);
    }
    const handleDelete=()=>{

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prev) => {
                console.log(prev + 1);
                return (prev + 1)%(product.image.length-1) ;
            });
        }, 2000); 
    
        return () => clearInterval(interval); // Cleanup when unmounting
    }, [imgIndex]);

    

    return (
        <div>
            <div className='flex flex-col text-black'>
                
                <img src={product.image[imgIndex]} alt="" />
                <h2 className='text-black'>{product.name}</h2>
                <h4>
                    {product.description}
                </h4>
            </div>
            <div>
                <h2 className='text-black'>
                    ${product.price}
                </h2>
                <button onClick={()=>handleDelete}>Delete</button>
                <button onClick={(id)=>handleEdit(id)}>Edit</button>
            </div>
            
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.array.isRequired,
    }).isRequired,
};
