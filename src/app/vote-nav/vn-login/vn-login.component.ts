import { Component } from '@angular/core';
import { Logger } from '../../shared/logger.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'vn-login',
  templateUrl: './vn-login.view.html',
})
export class VnLoginComponent { 
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private _log: Logger
  ) {}

  open(content) {
    this._log['log']( "Open Modal" );
    this.modalService.open(content).result.then((result) => {
      this._log['log']( "Modal:" );
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this._log['log']( "Close Modal:" );
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this._log['log']( "Dismiss Modal:" );
    this._log['log']( reason );
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
