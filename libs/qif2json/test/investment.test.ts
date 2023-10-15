import fs from 'fs';
import {parseStream} from '../src';
import {describe, xit, expect} from '@jest/globals';
import assert from 'assert';

describe('investments', () => {
	const reader = fs.createReadStream(`${__dirname}/files/investments.qif`);

	xit('can parse investments', async () => {
		const qifData = await parseStream(reader, {dateFormat: 'us'});

		expect(qifData.type).toEqual('Invst');
		assert.ok(qifData.transactions);
		expect(qifData.transactions.length).toEqual(2);
		expect(qifData.transactions[0].date).toEqual('1993-08-25');
	});
});
