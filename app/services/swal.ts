import Swal, { SweetAlertResult } from "sweetalert2";

export default function useSwal() {
  async function accepted(text: string) {
    await Swal.fire({
      width: "250px",
      icon: "success",
      text: text == null ? "Data telah disimpan" : text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function rejected(text: string) {
    await Swal.fire({
      width: "250px",
      icon: "error",
      text: text == null ? "Data telah disimpan" : text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function confirmed(text: string): Promise<SweetAlertResult> {
    const response = await Swal.fire({
      width: "250px",
      text: text == null ? "Apa Anda Yakin?" : text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
    });

    return response;
  }

  return {
    accepted,
    rejected,
    confirmed,
  };
}
