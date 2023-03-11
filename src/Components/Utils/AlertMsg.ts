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

const showConfirmation = async () => {
    const user = "tope"
    return await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#222932',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete it ${user}!`
    }).then((result) => {
        if (result.isConfirmed) {

            //Function Goes Here

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success',
            )
        }
    })
}


export { showError, showSuccess, showWarning, showInfo, showConfirmation }