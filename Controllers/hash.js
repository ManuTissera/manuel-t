import bcrypt from 'bcrypt';

const password = 'Publico';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);