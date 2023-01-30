import React from 'react';
import { useEffect } from "react";
import { useState } from 'react';
import "./App.css";
import { API } from "./global";
import { Button } from "@mui/material";
import "./Pizza.css";

export default function Pizza() {
  const token=localStorage.getItem("token");
   const[products,setProducts]=useState([]);
   const getProducts= ()=>{
    fetch(`${API}/pizzas`,{
      method:"GET",
    })
    .then((data)=>data.json())
    .then((p)=>setProducts (p));
  };
  useEffect(()=> getProducts(),[]);

   const deleteproduct=async(id)=>{
  await fetch(`${API}/pizzas/${id}`,{
      method:'DELETE',
      headers:{'x-auth-token':token},
  }).then((data)=>data.json())
  .then(()=>getProducts());
   };

   return (
    <div className="product-list-container">{products.map((p)=>(<Pizzas product ={p} deleteButton={<Button variant="contained" color="error" onClick={()=>deleteproduct(p._id)}><i className="material-icons">delete</i></Button>}/>))}</div>
 );
 }

function Pizzas({product,deleteButton}){
  
  const [show,setShow]= useState(true);
  const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script");
      script.src=src;
      script.onload=()=>{
        resolve(true);
      };
      script.onerror=()=>{
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(()=>{
    loadScript("http://checkout.razorpay.com/v1/checkout.js");
  });
  function displayRazorpay(){
    const options={
      key:'rzp_test_VRUK5HpJRU5ZxB',
      currency:'INR',
      amount:product.price*100,
      name:'Pizza Mania Company',
      description:product.name,
      image:product.img,
      handler:function(response){
        console.log("PAYMENT ID :",response.razorpay_payment_id);
      },
    };
    const paymentObject=new window.Razorpay(options);
    paymentObject.open();
  }
 
  const isAdmin=localStorage.getItem("isAdmin")==="true";
return(
  <div className="product-container">
    <img src={product.img} alt={product.name} className="product-poster"></img>
    <div className="product-specs"><h2 className="product-name">{product.name}</h2>
    <p  className="product-price">{product.price}</p></div>
    <Button variant="contained" onClick={()=>setShow(!show)}>Description</Button>
    {isAdmin?deleteButton:null}
    {show?<p className="product-summary">{product.summary}</p>:""}  
    <Button  className="center" color="secondary" type="submit" variant="contained" 
    onClick={()=>displayRazorpay()}>BUY NOW</Button>
  </div>
);
}
 