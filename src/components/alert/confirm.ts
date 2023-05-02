import Swal from "sweetalert2"
// import {showSuccess} from '../Utils/AlertMsg'
import { toast } from "react-toastify";
// import Swal from "sweetalert2";

interface ConfirmDTO {
    title: string;
    description: string;
    onConfirm: () => void;
    message: string
}

const showSuccess = (successMsg: string) => {
    return toast.success(`${successMsg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}



const confirm = ({title, description, onConfirm, message}: ConfirmDTO) => {

    Swal.fire({
        title: `${title}`,
        text: `${description}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#222932',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm()
            showSuccess(message)
        }
    })
}


export { confirm }