import React, { useEffect, useState } from 'react'
import MerchantLayout from '@/components/layouts/MerchantLayout'
import { userAuthenticateToken } from '@/components/Utils/TokenAuthentication';
import LoadingScreen from '@/components/loader/loadingScreen';
import { showWarning } from "@/components/Utils/AlertMsg";




function Index() {

  //Get the user details from local storage andf check if ther's merchant_id 

  const [merchant, setMerchant] = useState<any>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {

    const merchant = userAuthenticateToken()

    if (merchant?.role === "merchant") {
      setMerchant(merchant)
      setIsLoaded(true)
    } else {
      showWarning("Please register as a merchant to continue")
      setTimeout(() => {
        window.location.href = "/signup/merchant"
      }, 3000)
    }
    
  }, [])


  return (
    <div>
      {
        !isLoaded ? <LoadingScreen /> : (
          <MerchantLayout title="Dashboard">

          </MerchantLayout>
        )
      }

    </div>
  )
}

export default Index