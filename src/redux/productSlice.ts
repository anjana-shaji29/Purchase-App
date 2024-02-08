import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHandler } from "./handleFetch.ts";

interface ProductItem {
   guid: string;
   name: string;
   details: string;
   image: string;
   count: number;
   rating: number;
}

interface InitialState {
   productList: Array<ProductItem>
}

const initialState: InitialState = { productList: [] };
   

export const getProducts = createAsyncThunk("getProducts", async (_, state : any) => {
  return fetchHandler(state,"http://localhost:8085/products/list","GET", {} );
})

export const deleteProduct = createAsyncThunk("deleteProducts", async(_,state: any) => {
   return fetchHandler(state, "http://localhost:8085/products/remove","DELETE", {})
})


export const productSlice = createSlice({
   name: 'products',
   initialState,

   reducers: {

   },

   extraReducers: (builder) => {
      builder
         .addCase(getProducts.fulfilled, (state, action) => {
            console.log(action);
            state.productList = action?.payload?.data?.data;

         })

   },

})


export default productSlice.reducer;
