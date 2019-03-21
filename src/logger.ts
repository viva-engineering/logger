
import { Writable } from 'stream';
import { FormatConstructor, Format } from './format/format';

export interface LoggerConfig {
	[formatConfig: string]: any,
	output: Writable,
	format: FormatConstructor
}

export class Logger {
	protected readonly output: Writable;
	protected readonly format: Format;

	constructor(config: LoggerConfig) {
		this.output = config.output;
		this.format = new config.format(config);
	}

	log(level: string, message: string, meta?: object) {
		const formatted = this.format.format(level, message, meta);

		this.output.write(formatted + '\n');
	}

	error(message: string, meta?: object) {
		this.log('error', message, meta);
	}

	warn(message: string, meta?: object) {
		this.log('warn', message, meta);
	}

	info(message: string, meta?: object) {
		this.log('info', message, meta);
	}

	verbose(message: string, meta?: object) {
		this.log('verbose', message, meta);
	}

	debug(message: string, meta?: object) {
		this.log('debug', message, meta);
	}

	silly(message: string, meta?: object) {
		this.log('silly', message, meta);
	}
}
