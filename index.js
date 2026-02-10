#!/usr/bin/env zx

// >> $ ./index.js --config ./example.js apps

import { fs, path, argv } from "zx";
import { pathToFileURL } from "node:url";

if (!argv?.config || !fs.existsSync(argv.config)) {
	process.exit(1);
}

const configPath = path.resolve(argv.config);
if (!configPath) {
	process.exit(1);
}

const config = await import(pathToFileURL(configPath).href);
if (!config) {
	process.exit(1);
}
// console.log(config);
// console.log(config?.default);
// process.exit(1);

const words = argv._.slice(1);
const currentWord = words[words.length - 1] || "";
const previousWords = words.slice(0, -1);
// console.log(words);
// console.log(currentWord);
// console.log(previousWords);

let currentNode = config?.default;
for (const word of previousWords) {
	if (currentNode[word]) {
		currentNode = currentNode[word];
	} else {
		currentNode = null;
		break;
	}
}

let candidates = [];
if (currentNode) {
	if (Array.isArray(currentNode)) {
		candidates = currentNode;
	} else if (typeof currentNode === "object") {
		candidates = Object.keys(currentNode);
	}
}
// console.log(candidates)

const filtered = candidates.filter((c) => c.startsWith(currentWord));
console.log(filtered.join("\n"));
