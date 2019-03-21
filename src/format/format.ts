
import { LoggerConfig } from '../index';

export interface Format {
	format(level: string, message: string, meta?: object): string;
}

export interface FormatConstructor {
	new (config: LoggerConfig): Format;
}
