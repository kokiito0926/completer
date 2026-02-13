#!/usr/bin/env node

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
const root = config?.default;
if (root === undefined) {
	console.error("Error: Config file must have a default export.");
	process.exit(1);
}

const rawWords = process.argv.slice(2);
const words = [];
for (let i = 0; i < rawWords.length; i++) {
	if (rawWords[i] === "--config") {
		i++; // Skip the flag value
		continue;
	}
	words.push(rawWords[i]);
}

const currentWord = words[words.length - 1] || "";
const previousWords = words.slice(0, -1);

let currentNode = root;
for (const word of previousWords) {
	if (currentNode && typeof currentNode === "object" && Object.hasOwn(currentNode, word)) {
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

const filtered = candidates.filter((c) => c.startsWith(currentWord));
if (filtered.length > 0) {
	console.log(filtered.join("\n"));
}
