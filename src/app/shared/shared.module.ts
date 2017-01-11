import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DoughnutComponent } from './doughnut/doughnut.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations : [
    DoughnutComponent
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DoughnutComponent
  ],
  providers: [ 
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class SharedModule { }
