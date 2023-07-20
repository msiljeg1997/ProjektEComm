import { EventEmitter, Injectable } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCOunt = 0;
  loadingFinished = new EventEmitter<boolean>();

  constructor(private spinnerService: NgxSpinnerService) { }


  busy() {
    this.busyRequestCOunt++;
    this.spinnerService.show(undefined, {
      type: 'ball-scale-multiple',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    })
  }

  idle() {
    this.busyRequestCOunt--;
    if (this.busyRequestCOunt <= 0) {
      this.busyRequestCOunt = 0;
      this.spinnerService.hide();
      this.loadingFinished.emit(true);
    }
  }
}
