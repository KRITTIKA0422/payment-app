import "./Addpizza.css";
import React from "react";
import { useFormik } from 'formik';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { API } from './global';

export default function Addpizza(){
    const validate = values => {
        const errors = {};
        if (!values.id) 
        errors.id = 'Field is Required';
        if (!values.name) 
          errors.name = 'Field is Required';
          if (!values.price) 
          errors.price = 'Field is Required';
          if (!values.summary) 
          errors.summary = 'Field is Required';
          if (!values.img) 
          errors.img = 'Field is Required';
        return errors;
      };
     const formik=useFormik({ 
        initialValues:{id:"",name:"",price:"",summary:"",img:""},
        validate,
        onSubmit:(productDetails)=>{
            console.log("onSubmit",productDetails);
            alert(JSON.stringify(productDetails, null, 2));
            
            fetch(`${API}/pizzas`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(productDetails),
            }).then((data)=>data.json());
        },

          });
  

    return(
        <div className="form_container">
        <h2 className="productheader">Enter New Pizza Details</h2>
        <form  className="product_form" onSubmit={formik.handleSubmit}>
        <TextField id="id" label="Product Id" variant="outlined"  onChange={formik.handleChange}
        value={formik.values.id}
        name="id" />
       {formik.touched.id && formik.errors.id ? (
         <div>{formik.errors.id}</div>
       ) : null}
        <TextField id="name" label="Product Name" variant="outlined"  onChange={formik.handleChange}
        value={formik.values.name}
        name="name" />
       {formik.touched.name && formik.errors.name ? (
         <div>{formik.errors.name}</div>
       ) : null}
        <TextField id="price" label="Price value" variant="outlined"  
        onChange={formik.handleChange} 
        value={formik.values.price}
        name="price" />
        {formik.touched.price && formik.errors.price ? (
         <div>{formik.errors.price}</div>
       ) : null}
         <TextField id="summary" label="Product Details" variant="outlined"  
        onChange={formik.handleChange} 
        value={formik.values.summary}
        name="summary" />
        {formik.touched.summary && formik.errors.summary ? (
         <div>{formik.errors.summary}</div>
       ) : null}
         <TextField id="img" label="Image URL" variant="outlined"  
        onChange={formik.handleChange} 
        value={formik.values.img}
        name="img" />
        {formik.touched.img && formik.errors.img ? (
         <div>{formik.errors.img}</div>
       ) : null}
        <Button variant="contained" type="submit">SUBMIT DETAILS</Button>
        </form>
        </div>
    );
}
