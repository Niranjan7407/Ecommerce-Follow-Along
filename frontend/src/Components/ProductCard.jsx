import React,{useEffect} from 'react';
import PropTypes from 'prop-types';



export default function ProductCard({product}) {

    useEffect(()=>{
        document.body.style.backgroundColor='azure'
      })

    return (
        <div>
            <div className='flex flex-col text-black'>
                <img src={product.image} alt="" />
                <h2 className='text-black'>{product.name}</h2>
                <h4>
                    {product.description}
                </h4>
            </div>
            <div>
                <h2>
                    ${product.price}
                </h2>
                <button>Buy Now</button>
            </div>
            
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};
