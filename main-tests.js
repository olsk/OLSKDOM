const { throws, deepEqual } = require('assert');

const mod = require('./main.js');
import { JSDOM } from 'jsdom';

describe('OLSKDOMMetadata', function test_OLSKDOMMetadata () {

	const _OLSKDOMMetadata = function (inputData) {
		return mod.OLSKDOMMetadata(inputData, {
			JSDOM: JSDOM.fragment,
		});
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKDOMMetadata(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(_OLSKDOMMetadata(''), {});
	});

	it('sets title', function () {
		const title = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<title>${ title }</title>`), {
			title,
		});
	});

	it('sets meta:name', function () {
		const name = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta name="${ name }" content="${ content }" />`), {
			[name]: content,
		});
	});

	it('sets meta:property', function () {
		const property = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta property="${ property }" content="${ content }" />`), {
			[property]: content,
		});
	});

	it('sets meta:itemprop', function () {
		const itemprop = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta itemprop="${ itemprop }" content="${ content }" />`), {
			[itemprop]: content,
		});
	});

	it('sets link:itemprop', function () {
		const itemprop = Math.random().toString();
		const href = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<link itemprop="${ itemprop }" href="${ href }" />`), {
			[itemprop]: href,
		});
	});

	it('sets *:itemprop', function () {
		const tag = uRandomElement('meta', 'link');
		const itemprop = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<${ tag } itemprop="${ itemprop }" content="${ content }" />`), {
			[itemprop]: content,
		});
	});

	it('sets json-ld', function () {
		const key = Math.random().toString();
		const value = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<script type="application/ld+json">[{"${ key }":"${ value }"}]</script>`), {
			[key]: value,
		});
	});

	it('sets link:rel', function () {
		const rel = Math.random().toString();
		const href = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<link rel="${ rel }" href="${ href }" />`), {
			[rel]: href,
		});
	});

});
