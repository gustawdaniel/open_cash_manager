import {deserializeQif, serializeQif, QifData} from 'qif-ts';
//import fs from 'fs'

const qif :string= `!Account
NAlior GBP
TBank
^
NAlior PLN
TBank
^
!Account
NAlior PLN
TBank
^
!Type:Bank
D04/30'16
PWeb Page
U750.00
T750.00
LIncome:Invoices
^
D05/04'16
PAccounting
U-668.28
T-668.28
LCompany:Accounting
^
!Account
NAlior GBP
TBank
^
!Type:Bank
D04/30'16
PNew computer
U900.00
T900.00
LCompany:Devices
^
D05/04'16
PCoffee
U-855.28
T-855.28
LFood:Drink
^`;
const output :QifData= deserializeQif(qif);

console.log(serializeQif(output));
