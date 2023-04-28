import { combineReducers } from "@reduxjs/toolkit";

import {
    // MERCHANTS
    getMerchantsReducer,
    deleteMerchantReducer,
    updateMerchantReducer,
    getMerchantReducer,
    registerMerchantReducer,
    disableMerchantReducer,
    reactivateMerchantReducer,
    approveMerchantReducer,

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
    deleteUser,
    getUserReducer,
    forgetPasswordReducer,
    resetPasswordReducer,


    // LOGIN
    loginUserReducer,

    // PRODUCTS
    getProductsReducer,
    getProductReducer,
    createProductReducer,
    getProductsCategoryReducer,

    //FEATURES
    getFeaturesReducer,
    deleteFeatureReducer,
    createFeatureReducer ,


    // ORDERS
    getOrdersReducer,

    // DISPUTES
    updateDispute,
    createDispute,
    getDisputes,

} from './combineImports'


const reducers = combineReducers({

    //MERCHANT REDUCERS
    getMerchants: getMerchantsReducer,
    deleteMerchant: deleteMerchantReducer,
    updateMerchant: updateMerchantReducer,
    getMerchant:  getMerchantReducer,
    registerMerchant: registerMerchantReducer,
    disableMerchant : disableMerchantReducer, 
    reactivateMerchant: reactivateMerchantReducer,
    approveMerchant : approveMerchantReducer, 


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
    delete : deleteUser,
    getUser: getUserReducer,
    forgetPassword: forgetPasswordReducer, 
    resetPassword: resetPasswordReducer,


    //LOGIN REDUCERS
    authUser: loginUserReducer ,



    // PRODUCTS
    getProducts : getProductsReducer,
    getProduct : getProductReducer,
    createProduct : createProductReducer, 
    getProductsCategory : getProductsCategoryReducer,


    //FEATURES REDUCERS
    getFeatures: getFeaturesReducer,
    deleteFeature: deleteFeatureReducer,
    createFeature: createFeatureReducer ,


    //ORDERS REDUCERS
    getOrders: getOrdersReducer,

    // DISPUTE REDUCERS
    updateDispute: updateDispute,
    createDispute: createDispute,
    getDisputes: getDisputes,
})

export { reducers };