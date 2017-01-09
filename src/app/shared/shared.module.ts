import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';

import { DisableFormControlDirective } from './disable-fc.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations : [
    DisableFormControlDirective
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DisableFormControlDirective,
    NgbModule
  ],
  providers: [ 
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class SharedModule { }
