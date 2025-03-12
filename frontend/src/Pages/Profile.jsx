import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile(){
    const [data,setData]=useState({});
    const navigate = useNavigate();
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundColor="wheat";
    }, []);
    // Examples of addresses
    const addresses = [
        {
            addressType: "Home",
            address1: "123 Main St",
            address2: "Apt 4B",
            city: "New York",
            country: "USA",
            zipCode: "10001"
        },
        {
            addressType: "Work",
            address1: "456 Corporate Blvd",
            address2: "Suite 800",
            city: "San Francisco",
            country: "USA",
            zipCode: "94105"
        },
        {
            addressType: "Parents' House",
            address1: "789 Oak Lane",
            address2: "",
            city: "Chicago",
            country: "USA",
            zipCode: "60614"
        }
    ];
    // axios.get("http://localhost:3000/get-user", {email: email})
    // .then(response => {
    //     setData(response.data);
    // })
    const handleAddress = () => {
        navigate("/add-address",{state: {email: "niranjan.r.s67@kalvium.community"}});
    }

    
    
    return(
        <div className="text-black">
            <div className="flex flex-row  justify-start" style={{gap: "2rem"}}>
                <div className="profile-img">
                    
                </div>
                <div className="profile-info">
                    <h2>Niranjan</h2>
                    <h3>niranjan.r.s67@kalvium.community</h3>
                </div>
            </div>
            <br />
            {(addresses.length > 0) && (
            <div className="flex flex-row gap-x-8 p-8 align-middle shadow-md" style={{gap: "2rem"}}>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <h3>{address.addressType}</h3>
                        <p>{address.address1}</p>
                        <p>{address.address2}</p>
                        <p>{address.city}</p>
                        <p>{address.country}</p>
                        <p>{address.zipCode}</p>
                    </div>))}
                    <button onClick={()=>handleAddress()} className="text-white">Add Address</button>
            </div>)
}
{(!addresses) && (
            <div className="flex flex-row gap-x-8 p-8 align-middle shadow-md" style={{gap: "2rem"}}>
                <div>
                    <h3>No Address Found</h3>
                </div>
                <button onClick={()=>handleAddress()} className="text-white">Add Address</button>
                
            </div>)
}
        </div>
    );
}

export default Profile;