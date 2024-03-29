import getMerchantsReducer from "./Features/merchant/getMerchantsSlice";
import deleteMerchantReducer from "./Features/merchant/deleteMerchantSlice";
import updateMerchantReducer from "./Features/merchant/updateMerchantSlice";
import getMerchantReducer from "./Features/merchant/getMerchantSlice";
import disableMerchantReducer from "./Features/merchant/disableMerchantSlice";
import reactivateMerchantReducer from "./Features/merchant/reactivateMerchantSlice";
import approveMerchantReducer from "./Features/merchant/approveMerchant";



import getCaptionReducer from './Features/caption/getCaptionSlice'
import updateCaptionReducer from './Features/caption/updateCaptionSlice'
import getCaptionsReducer from './Features/caption/getCaptionsSlice'
import deleteCaptionReducer from './Features/caption/deleteCaptionSlice'
import createCaption from "./Features/caption/createCaption";
import registerMerchantReducer from "./Features/merchant/registerMerchantSlice";
import createDonationReducer from "./Features/donation/createDonationSlice";
import createCategoryReducer from "./Features/category/createCategorySlice";
import getCategoriesReducer from "./Features/category/getCategoriesSlice";
import updateCategoryReducer from "./Features/category/updateCategorySlice";
import getCategoryReducer from "./Features/category/getCategorySlice";
import deleteCategoryReducer from "./Features/category/deleteCategorySlice";
import getCitiesReducer from "./Features/city/getCitiesSlice";
import deleteCityReducer from "./Features/city/deleteCitySlice";
import createCityReducer from "./Features/city/createCitySlice";
import updateCityReducer from "./Features/city/updateCitySlice";
import getCityReducer from "./Features/city/getCitySlice";
import getUsersReducer from "./Features/user/getUsersSlice";
import registerUserReducer from "./Features/user/registerUserSlice";
import deleteUser from "./Features/user/deleteUserSlice";
import getUserReducer from "./Features/user/getUserSlice";
import forgetPasswordReducer  from "./Features/auth/authForgetPasswordSlice";

import loginUserReducer  from './Features/auth/authLoginSlice';
import getProductsReducer from './Features/product/getProductsSlice';
import resetPasswordReducer  from "./Features/auth/authResetPasswordSlice";

import getFeaturesReducer from "./Features/feature/getFeaturesSlice"
import deleteFeatureReducer from "./Features/feature/deleteFeatureSlice"
import createFeatureReducer from "./Features/feature/createFeatureSlice";

import getOrdersReducer from "./Features/order/getOrdersSlice";
import getOrderReducer from "./Features/order/getOrderSlice";
import createOrderReducer from "./Features/order/createOrderSlice"

import getProductReducer from './Features/product/getProductSlice'
import createProductReducer from './Features/product/getProductSlice'
import getProductsCategoryReducer from './Features/product/getProductsCategorySlice'

import getDisputes from './Features/dispute/getDisputesSlice'
import updateDispute from './Features/dispute/updateDisputeSlice'
import createDispute from './Features/dispute/createDisputeSlice'

import updateUserReducer from "./Features/user/updateUserSlice";

import reactivateUserReducer from "./Features/user/reactivateUserSlice";
import disableUserReducer from "./Features/user/disableUserSlice";




export {
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
    loginUserReducer,
    getUserReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    updateUserReducer,
    reactivateUserReducer,
    disableUserReducer,


    //PRODUCTS
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
    getOrderReducer,
    createOrderReducer,


    // DISPUTES
    updateDispute,
    createDispute,
    getDisputes,

    
}

