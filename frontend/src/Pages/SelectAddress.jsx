import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const SelectAddress=()=>{
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const location = useLocation();
    const email = location.state.email;

    // useEffect(() => {
    //     const fetchAddresses = async () => {
    //     const { data } = await axios.get('http://localhost:3000/get-address', { email:email });
    //     setAddresses(data.addresses);
    //     };
    
    //     fetchAddresses();
    // }, []);

    const add = [
        {
          country: "USA",
          city: "New York",
          address1: "123 Main St",
          address2: "Apt 4B",
          zipCode: 10001,
          addressType: "Home"
        },
        {
          country: "Canada",
          city: "Toronto",
          address1: "456 Maple Ave",
          address2: "Unit 22",
          zipCode: 1001,
          addressType: "Work"
        },
        {
          country: "UK",
          city: "London",
          address1: "789 Oxford St",
          address2: "",
          zipCode: 10025,
          addressType: "Vacation Home"
        }
      ];
        useEffect(() => {
            document.getElementsByTagName('body')[0].style.backgroundColor="white";
            setAddresses(add);
        }, []);
      
    
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };
    
    return (
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
        <button className='text-black bg-white border border-black'>Continue</button>
        </>
    );
    }

export default SelectAddress;