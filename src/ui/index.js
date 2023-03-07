const {
  createMongoAbility,
  subject,
} = require('@casl/ability');

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
];

/**
* Checks attribute based access control permissions
* @param {string} action - The action/permission is needed for checking access in the permission list, i.e:
  whether module-2__feature-4__attribute-24 exists or not in the permissions list
* @param {array} permissions - Permissions data initialization, i.e:
    [
      {
        action: 'module-2__feature-4__attribute-24',
        subject: 'ABAC',
        reason: 'You are not allowed to access this resource',
      },
    ]
* @param {object} attrs - Conditional attributes are needed for adding conditions, i.e:
    {
      action: 'module-2__feature-4__attribute-24',
      subject: 'ABAC',
      conditions: { active: true },
      reason: 'You are not allowed to access this resource',
    }
* @returns {boolean} - true/false
*/

const hasAbility = (
  action,
  permissions = [],
  attrs = {},
) => {
  // const rulesData = (permissions.length > 0 && permissions) || JSON.parse(localStorage?.getItem('userPermissions') || '[]');
  // OR
  const rulesData = (permissions.length > 0 && permissions);
  const ability = createMongoAbility(rulesData);
  return ability.can(action, subject('ABAC', attrs));
};


// Example
// if(hasAbility('module-1__feature-1__attribute-1', rules)) {
//   <h1>Hello world!</h1> // component name here
// }

// Example 2
// console.log('hasAbility', hasAbility('module-1__feature-1__attribute-1', rules)); // true
console.log('hasAbility', hasAbility('module-1__feature-2__attribute-2',
  rules,
  {
    published: false,
  })
);
