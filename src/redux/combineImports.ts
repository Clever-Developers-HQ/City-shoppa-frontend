import getMerchantsReducer from "./Features/merchant/getMerchantsSlice";
import deleteMerchantReducer from "./Features/merchant/deleteMerchantSlice";
import updateMerchantReducer from "./Features/merchant/updateMerchantSlice";
import getMerchantReducer from "./Features/merchant/getMerchantSlice";
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

export {
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
}

