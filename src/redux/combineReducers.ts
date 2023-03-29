import { combineReducers } from "@reduxjs/toolkit";

import {
    // MERCHANTS
    getMerchantsReducer,
    deleteMerchantReducer,
    updateMerchantReducer,
    getMerchantReducer,
    registerMerchantReducer,

    // CAPTIONS
    getCaptionReducer,
    updateCaptionReducer,
    getCaptionsReducer,
    deleteCaptionReducer,
    createCaption,

    //DONATIONS
    createDonationReducer,

    //CATEGORIES
    createCategoryReducer,
    getCategoriesReducer,
    updateCategoryReducer,
    getCategoryReducer,
    deleteCategoryReducer,

    //CITIES
    getCitiesReducer,
    deleteCityReducer,
    createCityReducer,
    updateCityReducer,
    getCityReducer,


    //USERS
    getUsersReducer,
    registerUserReducer,
    


} from './combineImports'


const reducers = combineReducers({

    //MERCHANT REDUCERS
    getMerchants: getMerchantsReducer,
    deleteMerchant: deleteMerchantReducer,
    updateMerchant: updateMerchantReducer,
    getMerchant:  getMerchantReducer,
    registerMerchant: registerMerchantReducer,

    // CAPTION REDUCERS
    getCaption: getCaptionReducer,
    updateCaption: updateCaptionReducer,
    getCaptions: getCaptionsReducer,
    deleteCaption: deleteCaptionReducer,
    createCaption: createCaption,

    //DONATION REDUCERS
    createDonation: createDonationReducer,

    //CATEGORY REDUCERS
    createCategory: createCategoryReducer,
    getCategories: getCategoriesReducer,
    updateCategory: updateCategoryReducer,
    getCategory: getCategoryReducer,
    deleteCategory: deleteCategoryReducer,

    // CITIES REDUCERS
    getCities: getCitiesReducer,
    deleteCity: deleteCityReducer,
    createCity: createCityReducer,
    updateCity: updateCityReducer,
    getCity: getCityReducer,


    //USERS REDUCERS 
    getUsers: getUsersReducer,
    registerUser : registerUserReducer,

})

export { reducers };