import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(resolve('apps/web/package.json'));
const patches = new Map([
	[
		'bulma/sass/utilities/mixins.sass',
		[
			['if($right, "right", "left")', 'if(sass($right): "right"; else: "left")'],
			['if($right, "left", "right")', 'if(sass($right): "left"; else: "right")']
		]
	],
	[
		'bulma/sass/utilities/functions.sass',
		[
			[
				'if($dividend > 0 and $divisor > 0, 1, -1)',
				'if(sass($dividend > 0 and $divisor > 0): 1; else: -1)'
			]
		]
	],
	[
		'bulma/sass/helpers/typography.sass',
		[["if($target == '', '', '-' + $target)", "if(sass($target == ''): ''; else: '-' + $target)"]]
	]
]);

for (const [file, replacements] of patches) {
	const filePath = require.resolve(file);
	let source = await readFile(filePath, 'utf8');
	let changed = false;

	for (const [deprecatedSyntax, modernSyntax] of replacements) {
		if (source.includes(deprecatedSyntax)) {
			source = source.replaceAll(deprecatedSyntax, modernSyntax);
			changed = true;
		}
	}

	if (changed) {
		await writeFile(filePath, source);
	}
}