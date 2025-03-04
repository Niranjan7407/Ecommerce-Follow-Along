import { useEffect, useState } from "react";
import NavBar from "../Components/navbar";
import bg_regis from "./../assets/bg_regis.jpg";
import {useNavigate} from 'react-router-dom'; 

const AddressForm = () => {
    const [address, setAddress] = useState({address1: "", address2: "", city: "", country: "", zipCode: "",addressType: ""})
    const navigate = useNavigate();
    useEffect(() => {  
        document.getElementsByTagName('body')[0].style.backgroundImage = `url(${bg_regis})`;
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            ...address,
            email: "n.n.y.coc@gmail.com",
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/add-address",
                addressData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 201) {
                alert("Address added successfully!");
                navigate("/profile");
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
        }
    };

    return (
        <>
        <NavBar />
        <div className="address-form bg-white p-4 rounded-md text-left text-black">
            <form className="flex flex-col gap-2">
                <div>
                    <label className="p-4" htmlFor="address1">Address 1</label><br />
                    <input type="text" id="address1" placeholder="Enter address 1" value={address.address1} onChange={(e) => setAddress({...address, address1: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="address2">Address 2</label><br />
                    <input type="text" id="address2" placeholder="Enter address 2" value={address.address2} onChange={(e) => setAddress({...address, address2: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="city">City</label><br />
                    <input type="text" id="city" placeholder="Enter city" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="country">Country</label><br />
                    <input type="text" id="country" placeholder="Enter country" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="zipCode">Zip Code</label><br />
                    <input type="text" id="zipCode" placeholder="Enter zip code" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="addressType">Address Type</label><br />
                    <input type="text" id="addressType" placeholder="Home/Office" value={address.addressType} onChange={(e) => setAddress({...address, addressType: e.target.value})}/>
                </div>
                <br />
                <button type="submit" className="bg-emerald-800 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition" onClick={(e)=>submitHandler(e)}>Save</button>
            </form>
        </div>
        </>
    )

}

export default AddressForm;