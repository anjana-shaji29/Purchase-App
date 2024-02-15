import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { addPurchase, getPurchases } from '../../redux/purchaseSlice.ts';


interface State{
    name: string;
    // image: string;
    details: string;
    count: number;
    image: string;
    imageName: string;
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
    // image: '',
    details: '',
    count: 1,
    image:'',
    imageName:''
   
}
 

const PurchaseForm = ({onHide = ()=> {}, productId}) => {

    // console.log(guid);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, details, image, imageName, count  } = state;
    const [showToast, setShowToast] = useState<boolean>(false);
    const reduxDispatch = useAppDispatch();
    const productList = useAppSelector((state) => state.products.productList);
    // console.log(productList);
    const imgUrl = "http://localhost:8085/";


    const handlePurchase = (e)=> {

        e.preventDefault();

        if(productId){
           
            reduxDispatch(addPurchase({ productId, count}))
            .then( data => {

                if (data.payload.data.status === 200) {
                    onHide();
                    // reduxDispatch(getPurchases())
                    setShowToast(true);
                    setTimeout(() => {
                        setShowToast(false);
                        
                    }, 2000);
                    
                }

            })
        } 
    }

    useEffect(() => {
        if (productId) {
            const product = productList.find((product) => product.guid === productId);
            if (product) {
                dispatch({
                    name: product.name,
                    details: product.details,
                    // count: product.count,
                    image: `${imgUrl}${product.image}`,
                    imageName: product.imageName
                });
            }
        }
    }, [productId, productList]);


    function readFile(file) {
  
        const FR = new FileReader();
          
        FR.addEventListener("load", function(evt) {
          dispatch({image: evt?.target?.result});
          
        }); 
          
        FR.readAsDataURL(file);
        
      }


    const handleImage = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        const filename = file.name;
        dispatch({ imageName: filename});
        // console.log(filename);
        readFile(file);
       
    } 

  

// console.log(image);

    return (

        <>
        <form className='purchase-box' onSubmit={handlePurchase}>
            <h3> Add Purchase </h3> 
            <label className='form-group'>
                <div className='form-label'>  Name </div>
                <input className='form-control' type="text" value={name} onChange={e => dispatch({ name: e?.target?.value })} placeholder="Name" required />
            </label>
            <label className='form-group'>
                <div className='form-label'>  Image </div>
             { productId ? <img src={image}  alt={image}  style={{ maxWidth: "100px" }}/> :
                <input className='form-control password' type="file" onChange={handleImage} placeholder="" />  }
            </label>
            <label className='form-group'>
                <div className='form-label'>  Details </div>
                <input className='form-control' type="text" value={details} onChange={e => dispatch({ details: e?.target?.value })} placeholder="Details" required />

            </label>
            <label className='form-group'>
                <div className='form-label'> Count </div>
                <input className='form-control password' type="number" value={count} onChange={e => dispatch({ count: e?.target?.value })} placeholder="Count" required />
            </label>

            <div className='purchase-footer'>
               
              <button className='btn-primary' type="submit"> Add To Cart  </button>  
             <button className='btn-primary' type="submit"> Cancel </button>       
            </div>
        </form>

         {/* <Toast className='toast-container' show={showToast} onClose={() => setShowToast(false)}>
                                        <Toast.Header>
                                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                        </Toast.Header>
                                        <Toast.Body> Product Created </Toast.Body>
         </Toast> */}

        </>
    )
};

export default PurchaseForm;

