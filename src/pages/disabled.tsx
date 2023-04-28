import React from 'react'
import NavBar from '@/components/navigation/NavBar'
import SubmitBtn from "@/components/buttons/submitBtn";


function Disabled() {
  return (
    <>
    <NavBar/>
    <div className="flex w-full h-screen justify-center items-center">

<div> 


<h1 className='text-2xl font-extrabold text-center'>ACCOUNT DISABLED. PLEASE REACH OUT TO OUR CUSTOMER SUPPORT FOR FURTHER ASSISTANCE </h1>


<a
href="mailto:support@cityshoppa.com"
> 
<div className="mt-10 md-w-1/2">
<SubmitBtn
text= "Contact Support"
/>
  </div>
</a>


</div>

      
    </div>
    </>
  )

}

export default Disabled
