const cdeps = require('./cdeps');
const { existsSync } = require('fs');
const { join } = require('path');

module.exports = function getProxyConfig(configPath, args) {
	const { cwd } = args;
	const proxyFile = join(cwd, configPath);
	const defaultProxy = {};
	const clearCacheDelay = args.query.watchDelay || 300;
	let cache;
	let timer;

	let watchDirs = args.query.watchDirs || [];
	if (typeof watchDirs === 'string') watchDirs = [watchDirs];
	watchDirs = watchDirs.map(watchDir => join(cwd, watchDir));

	if (existsSync(proxyFile)) {
		console.log(`load rule from ${configPath}`);
	}

	function loadFile() {
		if (!cache && existsSync(proxyFile)) {
			console.log(`reload ${configPath}`);
			const depList = cdeps(proxyFile);
			depList.forEach(dep => delete require.cache[require.resolve(dep)]);

			Object.keys(require.cache).forEach(key => {
				watchDirs.forEach(watchDir => {
					if (key.indexOf(watchDir) === 0) {
						console.log(`DELETE CACHE REQUIRE: ${key}`);
						delete require.cache[key];
					}
				});
			});

			try {
				cache = require(proxyFile);
			} catch (e) {
				console.log(`${configPath} parse error: ${e}`);
			}
		}
		return cache;
	}

	function clearCache() {
		cache = null;
	}

	return () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(clearCache, clearCacheDelay);
		return loadFile() || defaultProxy;
	};
};
