
import { Writable } from 'stream';

export class ClusterOutput extends Writable {
	constructor() {
		super({
			decodeStrings: false,
			defaultEncoding: 'utf8'
		});
	}

	_write(chunk: string, encoding: string, callback: () => void) : void {
		process.send(chunk, callback);
	}
}
