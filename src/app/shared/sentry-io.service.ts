import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven
  .config('https://263268fcfe8a4e3dad2253c1f65cf4fa@sentry.io/119031')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError);
  }
}