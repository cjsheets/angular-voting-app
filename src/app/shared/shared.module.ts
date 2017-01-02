import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';


@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [ 
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class SharedModule { }
