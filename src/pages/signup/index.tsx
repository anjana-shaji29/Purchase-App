import React, { useState } from 'react';
import Form from "../../components/Form/index.tsx";
import "./index.scss";
import Toast from 'react-bootstrap/Toast';


const PageSignup = () => {

    // const [showToast, setShowToast] = useState<boolean>(false); // Toast
    // const [toastMessage, setToastMessage] = useState<string | null>(null);  // Toast Message

   
    return (
        <div className='signup-wrap'>
            <div className='logo-container'>
                <img src='./logo.png' alt='LOGO' />
            </div>
            <Form  />
            {/* <Toast show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Body>{toastMessage} </Toast.Body>
            </Toast> */}
           
        </div>

    );
};

export default PageSignup;