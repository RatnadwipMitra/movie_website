import React from "react";
import { NavLink } from "react-router-dom";

const Header=()=>{
    return(
        <>
        <div >
            <nav className=" bg-light" style={{marginTop:"0", padding:"10px", display:"flex",gap:"20px"}} >
                <div style={{ display:"flex",gap:"150px"}}>
                <h5><NavLink className="navbar-brand" to='/' style={{display:"flex",justifyContent:"center",marginLeft:"60px"}}>Movie Website</NavLink></h5>
                <NavLink className="navbar-brand" to='/movies' style={{display:"flex",justifyContent:"center"}}>Movies</NavLink>
                </div>
                <a className="navbar-brand" href="/Tvshows" style={{display:"flex",justifyContent:"center"}}>TV Shows</a>
                <a className="navbar-brand" href="/Peoplelist" style={{display:"flex",justifyContent:"center"}}> Peoples</a>
                
                
            </nav>
        </div>
        
        </>
    )
}
export default Header;