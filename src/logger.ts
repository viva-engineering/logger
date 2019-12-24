
import { Writable, WritableStream } from './shims';
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
	output: WritableStream,
	format: FormatConstructor,
	level?: LogLevel,
	meta?: object
}

export class Logger {
	protected readonly output: WritableStream;
	protected readonly format: Format;
	protected readonly level: number;
	protected readonly meta: object;

	constructor(config: LoggerConfig) {
		this.output = config.output;
		this.format = new config.format(config);
		this.level = logLevels[config.level || 'info'];
		this.meta = config.meta ? Object.freeze(config.meta) : null;
	}

	logRaw(message: string) {
		this.output.write(message);
	}

	log(level: LogLevel, message: string, meta?: object) {
		if (logLevels[level] <= this.level) {
			const formatted = this.format.format(level, message, this.getMeta(meta));

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

	protected getMeta(meta?: object) : object {
		if (! meta) {
			return this.meta;
		}

		if (! this.meta) {
			return meta;
		}

		return Object.assign({ }, this.meta, meta);
	}
}
