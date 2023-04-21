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
    deleteUser,
    getUserReducer,


    // LOGIN
    loginUserReducer,

    // PRODUCTS
    getProductsReducer,
    getProductReducer,
    createProductReducer,

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


    //LOGIN REDUCERS
    authUser: loginUserReducer ,



    // PRODUCTS
    getProducts : getProductsReducer,
    getProduct : getProductReducer,
    createProduct : createProductReducer, 


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