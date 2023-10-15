import fs from 'fs';
import {parseStream} from '../src';
import {describe, it, expect} from '@jest/globals';
import assert from 'assert';

describe('normalTransactions', () => {
	const reader = fs.createReadStream(`${__dirname}/files/normalTransactions.qif`);

	it('can parse normalTransactions', async () => {
		const qifData = await parseStream(reader, {dateFormat: 'us'});

		expect(qifData.type).toEqual('Bank');
		assert.ok(qifData.transactions);
		assert.ok(qifData.transactions[0].division);
		expect(qifData.transactions.length).toEqual(3);
		expect(qifData.transactions[0].date).toEqual('1994-06-01T00:00:00');
		expect(qifData.transactions[0].amount).toEqual(-1000);
		expect(qifData.transactions[0].number).toEqual('1005');
		expect(qifData.transactions[0].payee).toEqual('Bank Of Mortgage');
		expect(qifData.transactions[0].category).toEqual('[linda]');
		expect(qifData.transactions[0].division.length).toEqual(2);
		expect(qifData.transactions[0].division[0].category).toEqual('[linda]');
		expect(qifData.transactions[0].division[0].amount).toEqual(-253.64);
		expect(qifData.transactions[0].division[1].category).toEqual('Mort Int');
		expect(qifData.transactions[0].division[1].amount).toEqual(-746.36);

		expect(qifData.transactions[1].date).toEqual('1994-06-02T00:00:00');
		expect(qifData.transactions[1].amount).toEqual(75);
		expect(qifData.transactions[1].payee).toEqual('Deposit');

		expect(qifData.transactions[2].date).toEqual('1994-06-03T00:00:00');
		expect(qifData.transactions[2].amount).toEqual(-10);
		expect(qifData.transactions[2].payee).toEqual('JoBob Biggs');
		expect(qifData.transactions[2].memo).toEqual('J.B. gets bucks');
		expect(qifData.transactions[2].category).toEqual('Entertain');
		expect(qifData.transactions[2].address).toEqual([
			'1010 Rodeo Dr.',
			'Waco, Tx',
			'80505',
			'',
			'',
			'',
		]);
	});
});
