
import { Writable } from 'stream';
import { FormatConstructor, Format } from './format/format';

export type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	verbose: 3,
	debug: 4,
	silly: 5
};

export interface LoggerConfig {
	[formatConfig: string]: any,
	output: Writable,
	format: FormatConstructor,
	level?: LogLevel
}

export class Logger {
	protected readonly output: Writable;
	protected readonly format: Format;
	protected readonly level: number;

	constructor(config: LoggerConfig) {
		this.output = config.output;
		this.format = new config.format(config);
		this.level = logLevels[config.level || 'info'];
	}

	log(level: LogLevel, message: string, meta?: object) {
		if (logLevels[level] <= this.level) {
			const formatted = this.format.format(level, message, meta);

			this.output.write(formatted + '\n');
		}
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
