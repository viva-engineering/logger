
An extremely light-weight logger for node.js

### Install

```bash
$ npm install --save @viva-eng/logger
```

### Usage

```typescript
import { Logger, ReadableFormat, StdoutOutput } from '@viva-eng/logger';

const logger = new Logger({
	format: ReadableFormat,
	output: new StdoutOutput(),
	colors: true
});

logger.info('Hi there');
```
