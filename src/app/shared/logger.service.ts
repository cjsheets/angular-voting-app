// Declare the console as an ambient value so that TypeScript doesn't complain.
declare var console: any;

// Import the application components and services.
import { ILogger } from "../shared/interface/logger.interface";

// Set up the default logger. The default logger doesn't actually log anything; but, it
// provides the Dependency-Injection (DI) token that the rest of the application can use 
// for dependency resolution. Each platform can then override this with a platform-
// specific logger implementation, like the ConsoleLogService (below).
export class Logger implements ILogger {

	public assert( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public error( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public group( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public groupEnd( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public info( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public log( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public warn( ...args: any[] ) : void {
		// ... the default logger does no work.
	}
}

// I log values to the ambient console object.
export class ConsoleLogService implements ILogger {
	public assert( ...args: any[] ) : void {
		( console && console.assert ) && console.assert( ...args );
	}

	public error( ...args: any[] ) : void {
		( console && console.error ) && console.error( ...args );
	}

	public group( ...args: any[] ) : void {
		( console && console.group ) && console.group( ...args );
	}

	public groupEnd( ...args: any[] ) : void {
		( console && console.groupEnd ) && console.groupEnd( ...args );
	}

	public info( ...args: any[] ) : void {
		( console && console.info ) && console.info( ...args );
	}

	public log( ...args: any[] ) : void {
		( console && console.log ) && console.log( ...args );
	}

	public warn( ...args: any[] ) : void {
		( console && console.warn ) && console.warn( ...args );
	}


	// In the browser platform, we're going to use the ConsoleLogService as the
	// implementation of the Logger service. This way, when application components
	// inject "Logger" DI token, they'll actually receive "ConsoleLogService".
}
