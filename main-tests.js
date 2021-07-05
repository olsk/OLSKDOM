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

	it('extracts title', function () {
		const title = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<title>${ title }</title>`), {
			title,
		});
	});

	it('extracts meta:name', function () {
		const name = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta name="${ name }" content="${ content }" />`), {
			[name]: content,
		});
	});

	it('extracts meta:property', function () {
		const property = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta property="${ property }" content="${ content }" />`), {
			[property]: content,
		});
	});

	it('extracts meta:itemprop', function () {
		const itemprop = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<meta itemprop="${ itemprop }" content="${ content }" />`), {
			[itemprop]: content,
		});
	});

	it('extracts link:itemprop', function () {
		const itemprop = Math.random().toString();
		const href = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<link itemprop="${ itemprop }" href="${ href }" />`), {
			[itemprop]: href,
		});
	});

	it('extracts *:itemprop', function () {
		const tag = uRandomElement('meta', 'link');
		const itemprop = Math.random().toString();
		const content = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<${ tag } itemprop="${ itemprop }" content="${ content }" />`), {
			[itemprop]: content,
		});
	});

	it('extracts json-ld', function () {
		const key = Math.random().toString();
		const value = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<script type="application/ld+json">[{"${ key }":"${ value }"}]</script>`), {
			[key]: value,
		});
	});

	it('extracts link:rel', function () {
		const rel = Math.random().toString();
		const href = Math.random().toString();
		deepEqual(_OLSKDOMMetadata(`<link rel="${ rel }" href="${ href }" />`), {
			[rel]: href,
		});
	});

	context('_OLSKDOMMetadataFunding', function () {
		
		mod.OLSKDOMMetadataFundingDomains().forEach(function (domain) {

			context(domain, function () {

				const link = `${ uRandomElement('http', 'https') }://${ domain }/`;

				it('excludes if no info', function () {
					deepEqual(_OLSKDOMMetadata(`<a href="${ link }"></a>`), {});
				});
				
				it('includes if info', function () {
					const item = link + Math.random().toString();
					deepEqual(_OLSKDOMMetadata(`<a href="${ item }"></a>`), {
						_OLSKDOMMetadataFunding: [item],
					});
				});
			
			});
			
		});

		it('excludes if relative', function () {
			deepEqual(_OLSKDOMMetadata(`<a href="/${ Math.random().toString() }"></a>`), {});
		});		
		
	});

});

describe('OLSKDOMMetadataFundingDomains', function test_OLSKDOMMetadataFundingDomains () {

	it('returns array', function () {
		deepEqual(mod.OLSKDOMMetadataFundingDomains(), [
			'opencollective.com',
			'github.com/sponsors',
			'patreon.com',
		]);
	});

});
