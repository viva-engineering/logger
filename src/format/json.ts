
import { Format } from './format';
import { LoggerConfig } from '../logger';
import jsonStringify from 'fast-safe-stringify';

export class JsonFormat implements Format {
	constructor(protected readonly config: LoggerConfig) { }

	format(level: string, message: string, meta?: object) : string {
		const metaObject = Object.assign({ }, meta || { }, {
			timestamp: (new Date).toISOString()
		});

		return jsonStringify({ level, message, meta: metaObject }, this.replacer);
	}

	replacer(key: string, value: any) {
		return value instanceof Buffer
			? value.toString('base64')
			: value;
	}
}
