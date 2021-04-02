const mod = {

	OLSKDOMMetadata (inputData, debug = {}) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const doc = debug.JSDOM ? debug.JSDOM(inputData) : new DOMParser().parseFromString(inputData, 'text/html');

		return Array.from(doc.querySelectorAll('[name],[property],[itemprop],[rel]')).reduce(function (coll, item) {
			const key = item.getAttribute('name') || item.getAttribute('property') || item.getAttribute('itemprop') || item.getAttribute('rel');

			if (!key) {
				return coll;
			}

			return Object.assign(coll, {
				[key]: item.getAttribute('content') || item.getAttribute('href'),
			})
		}, [].concat.apply([], [doc.querySelector('title') ? {
			title: doc.querySelector('title').text,
		} : {}, JSON.parse((doc.querySelector('script[type="application/ld+json"]') || {}).innerHTML || '[]')]).reduce(function (coll, item) {
			return Object.assign(coll, item)
		}, {}));
	},
	
};

Object.assign(exports, mod);
