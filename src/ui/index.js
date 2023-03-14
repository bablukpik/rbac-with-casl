const {
  createMongoAbility,
  subject,
} = require('@casl/ability');

const permissions = require('./rules');

/**
* Checks attribute based access control permissions
* @param {array} permissions - Permissions data initialization, i.e:
  [
    {
      action: 'module-2__feature-4__attribute-24',
      subject: 'ABAC',
      reason: 'You are not allowed to access this resource',
    },
  ]
* @param {string} action - The action/permission is needed for checking access in the permission list, i.e:
  whether module-2__feature-4__attribute-24 exists or not in the permissions list
* @param {string} field - Conditional attributes are needed for adding conditions, i.e:
  {
    permissions: rules,
    action: 'module-1__feature-3__attribute-3',
    field: 'title',
    conditions: { published: false },
  }
* @param {object} conditions - Conditional attributes are needed for adding conditions, i.e:
  {
    permissions: rules,
    action: 'module-1__feature-2__attribute-2',
    conditions: { published: true }
  }
* @returns {boolean} - true/false
*/

const hasAbility = ({
  permissions = [],
  action,
  subj = 'ABAC',
  field = undefined,
  conditions = {},
}) => {
  // const rulesData = (permissions.length > 0 && permissions) || JSON.parse(localStorage?.getItem('userPermissions') || '[]');
  // OR
  const rulesData = (permissions.length > 0 && permissions);
  const ability = createMongoAbility(rulesData);
  return ability.can(action, subject(subj, conditions), field);
};


// Example
// console.log('hasAbility', hasAbility({ action: 'module-1__feature-1__attribute-1', permissions })); // true
// if(hasAbility({ action: 'module-1__feature-1__attribute-1', permissions })) {
//   <h1>Hello world!</h1> // component name here
// }

// Example 2
// console.log('hasAbility', hasAbility({
//   permissions,
//   action: 'module-1__feature-2__attribute-2',
//   conditions: { published: true }
// })
// );

// Example 3
// console.log('hasAbility', hasAbility({
//   permissions,
//   action: 'module-1__feature-3__attribute-3',
//   field: 'title',
//   conditions: { published: false },
// })
// );

// Example 4
console.log('hasAbility', hasAbility({
  permissions,
  action: 'CREATE',
  subj: 'Article',
  conditions: { published: false },
})
); // true

console.log('hasAbility', hasAbility({
  permissions,
  action: 'DELETE',
  subj: 'Article',
  conditions: { published: false },
})
); // false, because DELETE does not exist in the action list of the rules
