import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import './adminPageCss.css';
function AdmingPage(){
    const navigate = useNavigate();
    return(
    <div className="admin-page">
    <div className="header">
        <div className="holder">
            <button className="button" onClick={()=>navigate("/manageUsers")}>Manage Users</button>
            <button className="button" onClick={()=>navigate("/userRoles")}>Manage User Roles</button>
            <button className="button" onClick={()=>navigate("/bank")}>Back</button>
        </div>
    </div>
    </div>)
}


export default AdmingPage;