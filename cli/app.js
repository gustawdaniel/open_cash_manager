const qif2json = require('qif2json');
const fs = require('fs');
const qif = require('qif');

qif2json.parseFile(`${__dirname}/../backup.qif`, {}, function(err, qifData){
    console.log(qifData);
    // fs.writeFileSync(`${__dirname}/../backup.json`, JSON.stringify(qifData));
    var transactions = {
        cash: [
            {
                date: '3/7/2014',
                amount: -213.39,
                payee: 'Kroger',
                memo: 'this is a memo',
                category: 'Groceries',
                checknumber: 123
            },
            {
                date: '3/6/2014',
                amount: -8.16,
                payee: 'Starbucks',
                category: 'Dining Out:Coffee',
                checknumber: 456
            }
        ]
    };
    const qifOut = qif.write(transactions);
    console.log(qifOut);
});