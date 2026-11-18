import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

// Collects the { file, browser, pass, currentTime, error } row each test attaches as an annotation.
export default class ResultsReporter {
	rows = [];

	constructor(options) {
		this.file = options.file;
	}

	onTestEnd(test, result) {
		const note = test.annotations.find(a => a.type === 'result');
		if (note) this.rows.push(JSON.parse(note.description));
		else this.rows.push({ file: test.title, browser: test.parent.project()?.name, pass: false, currentTime: 0, error: result.error?.message?.split('\n')[0] ?? 'no result recorded' });
	}

	onEnd() {
		mkdirSync(dirname(this.file), { recursive: true });
		writeFileSync(this.file, `${JSON.stringify(this.rows, null, 2)}\n`);
	}
}
