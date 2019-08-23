import Swal from "sweetalert2";

export const SwalFire = async (message, type) => {
  Swal.fire({
    html: `<p>${message}</p>`,
    type: type,
    showCloseButton: true
  });
};
