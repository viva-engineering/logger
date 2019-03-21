
import { Writable } from 'stream';

export class StdoutOutput extends Writable {
	constructor() {
		super({
			decodeStrings: false,
			defaultEncoding: 'utf8'
		});
	}

	_write(chunk: string, encoding: string, callback: () => void) : void {
		process.stdout.write(chunk, callback);
	}
}
