
import { Logger } from '../logger';
import { cluster, Writable } from '../shims';
import { Worker } from 'cluster';

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

	_write(chunk: string, encoding: string, callback) : void {
		process.send({ _dest: 'logger', message: chunk }, callback);
	}
}

export class ClusterOutputReceiver {
	constructor(protected readonly logger: Logger) {
		// Setup any already existing workers
		Object.keys(cluster.workers).forEach((key) => {
			this.setupWorker(cluster.workers[key]);
		});

		// Listen for new workers so we can set them up
		cluster.on('online', (worker: Worker) => {
			this.setupWorker(worker);
		});
	}

	protected setupWorker(worker: Worker) {
		worker.on('message', (message: ClusterOutputMessage) => {
			if (message._dest === 'logger') {
				this.logger.logRaw(message.message);
			}
		});
	}
}
