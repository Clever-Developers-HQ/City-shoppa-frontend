import { toast } from "react-toastify";
import Swal from "sweetalert2";



const showError = (errorMsg: string) => {
    return toast.error(`${errorMsg}`, {
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

const showWarning = (warningMsg: string) => {
    return toast.warn(`${warningMsg}`, {
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

const showInfo = (infoMsg: string) => {
    return toast.info(`${infoMsg}`, {
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

export interface ConfirmationProps{
    title: string;
    deleteHandler: any
}

const showConfirmation = async (title : string, deleteHandler: any) => {
    return await Swal.fire({
        title: `Are you sure?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#222932',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete ${title}!`
    }).then((result) => {
        if (result.isConfirmed) {

            //Delete function and API Call Goes Here
            deleteHandler

                Swal.fire(
                    'Deleted!',
                    `${title} deleted Successfully.`,
                    'success',
                )
        }
    })
}


export { showError, showSuccess, showWarning, showInfo, showConfirmation }