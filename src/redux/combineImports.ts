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
    createDonationReducer

}

