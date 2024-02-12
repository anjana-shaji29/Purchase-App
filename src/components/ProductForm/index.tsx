import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

interface State{
    name: string;
    image: string;
    details: string;
    count: number;
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
   
}
 


const ProductForm = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, image, details, count } = state;
    const [showToast, setShowToast] = useState<boolean>(false);

    return (

        <>

        <form className='signup-box' >
            <h3> Add Product </h3>
            <label className='form-group'>
                <div className='form-label'>  Name </div>
                <input className='form-control' type="text" value={name} onChange={e => dispatch({ name: e?.target?.value })} placeholder="Name" required />
            </label>
            <label className='form-group'>
                <div className='form-label'>  Image </div>
                <input className='form-control password' type="file" value={image} onChange={e => dispatch({ image: e?.target?.value })} placeholder="" />
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
                <Link to="/products">
                    <button className='btn-primary' type="submit"> Add Product </button> </Link>
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

