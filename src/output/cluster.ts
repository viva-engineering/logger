
import { Writable } from 'stream';
import { Logger } from '../logger';

interface ClusterOutputMessage {
	_dest: 'logger',
	message: string
}

export class ClusterOutput extends Writable {
	constructor() {
		super({
			decodeStrings: false,
			defaultEncoding: 'utf8'
		});
	}

	_write(chunk: string, encoding: string, callback: () => void) : void {
		process.send({ _dest: 'logger', message: chunk }, callback);
	}
}

export class ClusterOutputReceiver {
	constructor(protected readonly logger: Logger) {
		process.on('message', (message: ClusterOutputMessage) => {
			if (message._dest === 'logger') {
				this.logger.logRaw(message.message);
			}
		});
	}
}
