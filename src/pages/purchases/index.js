import React, { useEffect, useState } from 'react';
import './index.scss';
import { getPurchases } from '../../redux/purchaseSlice.ts';
import { useAppDispatch } from '../../redux/hooks.ts';



const PagePurchases = () => {

   
   
   
   
   
   
    const reduxDispatch = useAppDispatch();

   
   
   
   
    useEffect(() => {
        reduxDispatch(getPurchases())
        console.log(getPurchases());

    }, [reduxDispatch])










    return(
        <> </>

    );


}

export default PagePurchases;
