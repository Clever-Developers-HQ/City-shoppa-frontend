// import * as cloudinary from 'cloudinary';
// import cloudinary from "cloudinary";
import { showSuccess,showError } from './AlertMsg'
import crypto from 'crypto'

import axios from 'axios'
export const uploadFile = async (file: any) => {
    const formData = new FormData()

    console.log(process.env.CLOUDINARY_UPLOAD_PRESET, "THE UPLOAD PRESET ")
    formData.append("file", file)
    formData.append("upload_preset", 'drbenzene')
    formData.append("cloud_name", "dlhjvo4tz")

    const imageResult = await axios.post("https://api.cloudinary.com/v1_1/dlhjvo4tz/image/upload", formData)

    console.log(imageResult, "RESULT FROM THE IMAGE")
    return imageResult.data.secure_url
}





export const multipleUploadFile = async (images: any) => {
    const formData = new FormData()

    // formData.append("file", )

    //Map on the Images and add it to the append 

    images.map((image: any) => {
        formData.append("file", image.data_url)
    })
    formData.append("upload_preset", 'drbenzene')
    formData.append("cloud_name", "dlhjvo4tz")

    const imageResult = await axios.post("https://api.cloudinary.com/v1_1/dlhjvo4tz/image/upload", formData)

    console.log(imageResult, "RESULT FROM THE IMAGE")
    return imageResult.data.secure_url
}











export const updateImage = async (file: any, newImage: any, token:any) => {

    //Remove th public URL 

    const urlParts = file.split('/');
    const publicId = urlParts[urlParts.length - 1].split('.')[0];

    const timestamp: any = Math.floor(Date.now() / 1000);
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${591559167673873}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');


    const formData = new FormData()
    formData.append('public_id', publicId);
    formData.append('api_key', "591559167673873");
    formData.append('api_secret', "6LgkJOe0YlR8xJoKp4qgzXSosso");
    formData.append("signature", signature);
    formData.append("timestamp", timestamp )

    try{
        const result  = await axios.post(`https://api.cloudinary.com/v1_1/dlhjvo4tz/image/destroy`, formData);
        console.log(result, "THE RESULT")
        if (result){
           const imageUrl = uploadFile(newImage)
           return imageUrl
        }
    } catch(err: any){
        console.log(err)
        showError(err)
    }

    const imageResult = await axios.post("https://api.cloudinary.com/v1_1/dlhjvo4tz/image/destroy", formData)

    return imageResult.data.secure_url
}
