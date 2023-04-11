import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NGXToastrService {

  constructor(public toastr: ToastrService) { }
  typeSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
}
}
