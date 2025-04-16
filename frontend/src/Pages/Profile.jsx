import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/navbar";


function Profile(){
    const [user,setUser]=useState({});
    const navigate = useNavigate();
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundColor="#F0FFFF";
        document.getElementsByTagName('body')[0].style.backgroundImage="";
        axios.get('https://ecommerce-follow-along-4ev4.onrender.com/auth/get-user',{headers:{"Authorization":localStorage.getItem("token")}}).then((response) => {
            console.log(response.data)
            setUser(response.data.user)
        })
    }, [user]);
    
    // then(response => {
    //     setData(response.data);
    // })axios.get("http://localhost:3000/get-user", {email: email})
    // .
    const handleAddress = () => {
        navigate("/add-address");
    }

    if (!localStorage.getItem("token")) {
        return (
          <div className="text-center mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.replace("/login")}
            >
              Login
            </button>
          </div>
        );
      }
    

    
    
    return( user.avatar  ?
        (<div className="text-black h-screen w-screen">
            <div className="top-2">
            <NavBar></NavBar>
            </div>
            <div className="flex flex-row  justify-start" style={{gap: "2rem"}}>
                <div className="profile-img">
                    <img style={{width:'80px',height:'80px'}} className="rounded-full" src={`https://ecommerce-follow-along-4ev4.onrender.com${user.avatar.url.replace(/\\/g, "/")}`} alt="" />
                </div>
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                </div>
            </div>
            <br />
            {(user.addresses && user.addresses.length > 0) ? (
            <div className="flex flex-row gap-x-8 p-8 align-middle shadow-md" style={{gap: "2rem"}}>
                {user.addresses.map((address, index) => (
                    <div key={index}>
                        <h3>{address.addressType}</h3>
                        <p>{address.address1}</p>
                        <p>{address.address2}</p>
                        <p>{address.city}</p>
                        <p>{address.country}</p>
                        <p>{address.zipCode}</p>
                    </div>))}
                    <button onClick={()=>handleAddress()} className="text-white">Add Address</button>
            </div>) : (
            <div className="flex flex-row gap-x-8 p-8 align-middle shadow-md" style={{gap: "2rem"}}>
                <div>
                    <h3>No Address Found</h3>
                </div>
                <button onClick={()=>handleAddress()} className="text-white">Add Address</button>
                
            </div>)
}
        </div>) : (
            <div>
                
            </div>
        )
    );
}

export default Profile;