import { combineReducers } from "@reduxjs/toolkit";

import {
    // MERCHANTS
    getMerchantsReducer,
    deleteMerchantReducer,
    updateMerchantReducer,
    getMerchantReducer,

    // CAPTIONS
    getCaptionReducer,
    updateCaptionReducer,
    getCaptionsReducer,
    deleteCaptionReducer,
    createCaption


} from './combineImports'


const reducers = combineReducers({

    //MERCHANT REDUCERS
    getMerchants: getMerchantsReducer,
    deleteMerchant: deleteMerchantReducer,
    updateMerchant: updateMerchantReducer,
    getMerchant:  getMerchantReducer,


    // CAPTION REDUCERS
    getCaption: getCaptionReducer,
    updateCaption: updateCaptionReducer,
    getCaptions: getCaptionsReducer,
    deleteCaption: deleteCaptionReducer,
    createCaption: createCaption


})

export { reducers };