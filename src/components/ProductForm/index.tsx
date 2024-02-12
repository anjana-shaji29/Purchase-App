import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch } from '../../redux/hooks.ts';
import { addProduct } from '../../redux/productSlice.ts';

interface State{
    name: string;
    image: string;
    details: string;
    count: number;
    base64: string;
 }

type reducerAction = Object;
 
const reducer = (state: State, action: reducerAction) => {
    return {
        ...state,
        ...action
    }
};
 
const initialState: State = {
    name: '',
    image: '',
    details: '',
    count: 0,
    base64:''
   
}
 


const ProductForm = ({onHide}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, image, details, count, base64 } = state;
    const [showToast, setShowToast] = useState<boolean>(false);
    const reduxDispatch = useAppDispatch();
    

    const handleSubmit = (e)=> {

        e.preventDefault();
        
        // reduxDispatch(addProduct({name, image, details, count }))
        

    }

    function readFile(file) {
  
        const FR = new FileReader();
          
        FR.addEventListener("load", function(evt) {
          dispatch({base64: evt.target.result});
          
        }); 
          
        FR.readAsDataURL(file);
        
      }


    const handleImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        const filename = file.name;
        readFile(file);
       
    } 

console.log(base64);

    return (

        <>

        <form className='signup-box' onSubmit={handleSubmit}>
            <h3> Add Product </h3>
            <label className='form-group'>
                <div className='form-label'>  Name </div>
                <input className='form-control' type="text" value={name} onChange={e => dispatch({ name: e?.target?.value })} placeholder="Name" required />
            </label>
            <label className='form-group'>
                <div className='form-label'>  Image </div>
                <input className='form-control password' type="file" value={image} onChange={handleImage} placeholder="" />
            </label>
            <label className='form-group'>
                <div className='form-label'>  Details </div>
                <input className='form-control' type="text" value={details} onChange={e => dispatch({ details: e?.target?.value })} placeholder="Details" required />

            </label>
            <label className='form-group'>
                <div className='form-label'> Count </div>
                <input className='form-control password' type="number" value={count} onChange={e => dispatch({ count: e?.target?.value })} placeholder="Count" required />
            </label>

            <div className='signup-footer'>
               
                    <button className='btn-primary' type="submit"> Add Product </button> 
            </div>
        </form>

         <Toast className='toast-container' show={showToast} onClose={() => setShowToast(false)}>
                                        <Toast.Header>
                                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                        </Toast.Header>
                                        <Toast.Body> Product Created </Toast.Body>
                                    </Toast>

        </>
    )
};

export default ProductForm;

