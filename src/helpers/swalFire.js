import Swal from 'sweetalert2';

export const SwalFire = (props, type) => {
    Swal.fire({
      html:`<p>${props}</p>`,
      type: type,
      showCloseButton: true
    });
  };
