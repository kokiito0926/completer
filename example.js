export default {
	apps: {
		list: [],
		info: ["--json", "--short"],
		delete: ["app-1", "app-2", "app-3"],
	},
	config: {
		set: ["port", "host", "timeout"],
		get: ["port", "host", "timeout"],
	},
	deploy: ["production", "staging"],
};
