import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(){}
  error(message: string, title?: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      // confirmButtonText: 'Cool'
    })
  }

  swalSuccessPopup( msg:any){
    Swal.fire({
      position: "top",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 3500,
    });
  }

  swalErrorPopup(msg:any){
    Swal.fire({
      position: "top",
      icon: "error",
      title: msg,
      background:"white",
      showConfirmButton: false,
      timer: 2500
    });
  }

  swalWarningPopup(msg:any){
    Swal.fire({
      position: "top",
      icon: "warning",
      title: msg,
      background:"white",
      showConfirmButton: false,
      timer: 2500
    });
  }


  Swaltoast(msg: any) {
    return Swal.fire({
      position: "top",
      showConfirmButton: false,
      text:msg,
      timer: 1000,
      width:300
    })
  }
}
