const rules = [
  {
    action: 'module-1__feature-1__attribute-1', // action id
    subject: 'ABAC',
    reason: 'You are not allowed to perform this action',
  },
  {
    action: 'module-1__feature-2__attribute-2',
    subject: 'ABAC',
    conditions: { published: false },
    reason: 'You are not allowed to perform this action',
  },
  {
    action: 'module-1__feature-3__attribute-3',
    subject: 'ABAC',
    conditions: { published: false },
    fields: ['title', 'description'],
    reason: 'You are not allowed to perform this action',
  },
  {
    action: ['CREATE', 'READ', 'UPDATE'], // you can use any name or id as action, see example 4
    subject: ['Article'],
    conditions: { published: false },
    reason: 'You are not allowed to perform this action',
  },
];

const users = [
  {
    id: 1,
    name: 'Bablu',
    email: 'bablukpik@gmail.com',
    rules
  },
  //...
];

// rules/permissions for a specific user which can be pulled from a database
const permissions = users.find((user) => user.email === 'bablukpik@gmail.com').rules;

module.exports = permissions;
