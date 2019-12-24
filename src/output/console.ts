
import { Writable } from '../shims';

export class ConsoleOutput extends Writable {
	constructor() {
		super({
			decodeStrings: false,
			defaultEncoding: 'utf8'
		});
	}

	_write(chunk: string, encoding: string, callback) : void {
		// Slice off the trailing newline before logging
		console.log(chunk.slice(0, -1));
		callback();
	}
}
