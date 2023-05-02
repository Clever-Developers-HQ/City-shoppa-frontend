import Swal from "sweetalert2"
import {showSuccess} from './../Utils/AlertMsg'

interface ConfirmDTO {
    title: string;
    description: string;
    onConfirm: () => void;
    message: string
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