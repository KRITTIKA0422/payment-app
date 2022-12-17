import React from 'react';
import { useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';
import axios from 'axios';
import "./App.css";
import { API } from "./global";
import { Button } from "@mui/material";
import "./Pizza.css";

export default function Pizza() {

   const[products,setProducts]=useState([]);
   const getProducts= ()=>{
    fetch(`${API}/pizzas`,{
      method:"GET",
    })
    .then((data)=>data.json())
    .then((p)=>setProducts (p));
  };
   useEffect(()=> getProducts(),[]);

   const deleteproduct=(id)=>{
  fetch(`${API}/pizzas/${id}`,{
      method:'DELETE',
  }).then((data)=>data.json())
  .then(()=>getProducts());
   };
   
   return (
    <div className="product-list-container">{products.map((p)=>(<Pizzas product ={p} deleteButton={<Button variant="contained" color="error" onClick={()=>deleteproduct(p.id)}><i className="material-icons">delete</i></Button>}/>))}</div>
 );
 }

function Pizzas({product,deleteButton}){
  
  const [show,setShow]= useState(true);
  async function handleToken(token){
    const response= await axios.post(`${API}/checkout`,{token,product})
    console.log(response.status);
    if(response.status===200){
  alert("Payment is completed successfully")
    }else{
      alert("Payment Failed")
  
    }
  }
return(
  <div className="product-container">
    <img src={product.img} alt={product.name} className="product-poster"></img>
    <div className="product-specs"><h2 className="product-name">{product.name}</h2>
    <p  className="product-price">{product.price}</p></div>
    <Button variant="contained" onClick={()=>setShow(!show)}>Description</Button>
    {deleteButton}
    {show?<p className="product-summary">{product.summary}</p>:""}  
    <StripeCheckout 
        className="center"
        stripeKey='pk_test_51MEchGSFxrjJu67ozLcznZH2M9oolMuRGYKomSDGdcR8dP3oh3YltRqwOG1v4XEVlKizvwriQKzLAOaZk46o8Ksb00szk9Crw0'
        token={handleToken}
        amount={product.price*100}
        name={product.name}
        billingAddress
        shippingAddress />
  </div>
);
}
