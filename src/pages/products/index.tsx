import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getProducts } from '../../redux/productSlice.ts';

const PageProducts = () => {

    const reduxDispatch = useAppDispatch();
    useEffect(() =>{
        reduxDispatch(getProducts())

    },[reduxDispatch])
    return (
        <div>
            PageProducts
        </div>
    );
};

export default PageProducts;
