import Swal from "sweetalert2"

export function ConfirmSend(_title = "ยืนยันการส่งข้อมูล", _text = ' '): Promise<boolean> {
  return new Promise(r => {
    Swal.fire({
      title: _title,
      text: _text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#347B4C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        r(true);
      } else {
        r(false);
      }
    }
    )
  })
}
