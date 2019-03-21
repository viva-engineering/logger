
import 'colors';
import { Format } from './format';
import { LoggerConfig, LogLevel } from '../logger';
import { inspect } from 'util';

interface ReadableFormatConfig extends LoggerConfig {
	colors: boolean
}

const coloredLevels = {
	error: 'error'.red,
	warn: 'warn'.yellow,
	info: 'info'.green,
	verbose: 'verbose'.cyan,
	debug: 'debug'.blue,
	silly: 'silly'.magenta
};

export class ReadableFormat implements Format {
	protected readonly inspectOptions: object;
	protected readonly seperator: string;

	constructor(protected readonly config: ReadableFormatConfig) {
		this.inspectOptions = {
			showHidden: false,
			depth: 1,
			colors: this.config.colors,
			compact: true
		};

		this.seperator = this.config.colors ? '='.grey : '=';
	}

	format(level: LogLevel, message: string, meta?: object) : string {
		const timestamp = `[${(new Date).toISOString()}]`;
		const metaString = this.formatMeta(meta);

		if (this.config.colors) {
			return `${timestamp.gray} ${coloredLevels[level]}: ${message} ${metaString}`;
		}

		return `${timestamp} ${level}: ${message} ${metaString}`;
	}

	formatMeta(meta?: object) : string {
		if (! meta) {
			return '';
		}

		const properties: string[] = [ ];

		Object.keys(meta).forEach((key) => {
			const value = meta[key];

			properties.push(`${key}${this.seperator}${inspect(value, this.inspectOptions)}`);
		});

		return properties.join(' ');
	}
}
