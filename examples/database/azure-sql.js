const nodeCloud = require('../../lib/');

const azure = nodeCloud.getProvider('Azure', process.env.ncconf);

const sql = azure.sql();

const resourceGroupName = 'nodecloud';
const serverName = 'nodecloud-test-sql-server';
const databaseName = 'nodecloud-test-database';
const params = {
  administratorLogin: 'test-user',
  administratorLoginPassword: 'Str0nGP@ssword',
  version: '12.0',
  location:'centralus' // required
};

const createDBParams = {
   location: 'centralus' // required
};

sql.createOrUpdateDBInstance(resourceGroupName, serverName, params)
  .then((res) => {
    console.log('Database Server Created.');
    return sql.createOrUpdateDatabase(resourceGroupName, serverName, databaseName, createDBParams);
  })
  .then((res) => {
    console.log('Database created.');
    return sql.deleteDatabase(resourceGroupName, serverName, databaseName);
  })
  .then((res) => {
    console.log('Database deleted');
    return sql.deleteDBInstance(resourceGroupName, serverName, {});
  })
  .then((res) => {
    console.log('Database Server Deleted');
  })
  .catch((err) => {
    console.error(err);
})
