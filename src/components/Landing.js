import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";


function Landing(){    

    const navigate = useNavigate()
    
        return (
            <div className="landing-outer">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
                <button onClick={() => navigate("/quick_list")}>Quick List</button>
            </div>
        )
        
}
export default Landing