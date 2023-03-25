import Swal from "sweetalert2"

interface ConfirmDTO {
    title: string;
    description: string;
    onConfirm: () => void;
}

const confirm = ({title, description, onConfirm }: ConfirmDTO) => {

    Swal.fire({
        title: `${title}`,
        text: `${description}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            //Function Goes Here
            onConfirm()
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}


export { confirm }