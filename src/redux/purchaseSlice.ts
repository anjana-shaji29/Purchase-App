import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHandler } from "./handleFetch.ts";
import { ProductItem } from "./productSlice.ts";


export interface PurchaseItem {
   guid: string;
   count: number;
   status?: number;
   productDetails: ProductItem
  
}

interface InitialState {
   purchaseList: Array<PurchaseItem>
}

const initialState: InitialState = { purchaseList: [] };
   

export const getPurchases = createAsyncThunk("getPurchases", async (_, state : any) => {
  return fetchHandler(state,"http://localhost:8085/purchases/list","GET", {} );
})

export const addPurchase = createAsyncThunk("addPurchase", async(body: object, state: any) => {
   return fetchHandler(state,"http://localhost:8085/purchases/add","POST", body)
})



export const purchaseSlice = createSlice({
   name: 'purchases',
   initialState,

   reducers: {

   },

   extraReducers: (builder) => {
      builder
         .addCase(getPurchases.fulfilled, (state, action) => {
            console.log(action);
            state.purchaseList = action?.payload?.data?.data;

         })

   },

})


export default purchaseSlice.reducer;