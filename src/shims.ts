
// 
// Includes shims for Node internals that we want to borrow, but be able to use
// in browser contexts
// 

import { isNode } from './environment';

export interface WritableCallback {
	(error: Error | null | undefined): void;
}

export interface WritableStreamConstructor {
	new (opts: import('stream').WritableOptions): WritableStream;
}

export interface WritableStream {
	write(chunk: any, cb?: WritableCallback): boolean;
	_write(chunk: any, encoding: string, cb: WritableCallback) : void;
}

// @ts-ignore
export const WritableShim: WritableStreamConstructor = class WritableShim implements WritableStream {
	constructor(opts: import('stream').WritableOptions) {
		// 
	}

	// @ts-ignore - It is impossible to make typescript happy with this, even directly copying the type from node
    public write(chunk: any, encoding: string, cb?: (error: Error | null | undefined) => void): boolean {
		this._write(chunk, 'utf8', () => { });

		return true;
	}

	public _write(chunk: string, encoding: string, callback: WritableCallback) {
		// Intended to be overwritten by inheriting classes
	}
}

export const Writable: WritableStreamConstructor = isNode ? require('stream').Writable : WritableShim;

export const cluster: typeof import('cluster') = isNode
	? require('cluster')
	: { } as typeof import('cluster');
