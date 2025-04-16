import { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';



const SelectAddress=()=>{
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const location = useLocation();
    const email = location.state.email;
    const navigate=useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
        const { data } = await axios.get('https://ecommerce-follow-along-4ev4.onrender.com/auth/get-address', {headers:{"Authorization":localStorage.getItem("token")}});
        console.log(data)
        setAddresses(data.addresses);
        };
    
        fetchAddresses();
    }, []);

        useEffect(() => {
          document.getElementsByTagName('body')[0].style.backgroundImage="";
          document.getElementsByTagName('body')[0].style.backgroundColor="#F0FFFF";
        }, []);
      
    
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };
    
    return (addresses && addresses.length > 0) ? (
        <>
        <h1 className='text-black'>Select Address</h1>
        <div className='flex flex-col justify-center justify-items-center items-center'>
        {addresses.map((address,val) => (
            <div key={val} onClick={() => handleSelectAddress(address)} className='rounded-md text-black' style={{cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px',width:'250px',height:'150px'}}>
            <h2>{address.addressType}</h2>
            <div>{address.address1},<br /> {address.address2} <br /> {address.city},{address.country} - {address.zipCode} </div>

            </div>
        ))}
        {selectedAddress && (
            <div className='text-black rounded-md' style={{cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px',width:'250px',height:'150px'}}>
            <h2>Selected Address</h2>
            <div>{selectedAddress.address1},<br /> {selectedAddress.address2} <br /> {selectedAddress.city},{selectedAddress.country} - {selectedAddress.zipCode} </div>

            </div>
        )}
        </div>
        <button className='text-black bg-white border border-black' onClick={()=>navigate('/confirm-order',{state:{selectedAddress:selectedAddress}})}>Continue</button>
        </>
    ) : (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-black'>No Addresses Found</h1>
            <button className='text-black bg-white border border-black' onClick={()=>navigate('/add-address',{state: {email: email}})}>Add Address</button>
        </div>
    ); 
    }

export default SelectAddress;