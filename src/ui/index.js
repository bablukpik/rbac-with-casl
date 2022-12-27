const {
  createMongoAbility,
  subject,
} = require('@casl/ability');

const rules = [
  {
    action: 'module-1__feature-1__attribute-1', // action id
    subject: 'ABAC',
    reason: 'You are not allowed',
  },
  {
    action: 'module-1__feature-2__attribute-1',
    subject: 'ABAC',
    reason: 'You are not allowed',
  },
];

const ability = createMongoAbility(rules);

// Example: 1, using class
// class ABAC {
//   constructor(attrs) {
//     Object.assign(this, attrs);
//   }
//   // this static method is needed for minification
//   static get modelName() {
//     return 'ABAC'
//   }
// }

// const abac = new ABAC();

// const hasAbility = (actionId = '') => ability.can(actionId, abac); // use redux or use as an exported function

// Example: 2, using subject helper
const hasAbility = (actionId = '') => ability.can(actionId, subject('ABAC', {}));

console.log('hasAbility', hasAbility('module-1__feature-1__attribute-1'));

// if(hasAbility('module-1__feature-2__attribute-1')) {
//   <h1>Hello world!</h1> // component name here
// }
