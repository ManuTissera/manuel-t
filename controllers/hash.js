import bcrypt from 'bcrypt';

const password = '1234Test';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);