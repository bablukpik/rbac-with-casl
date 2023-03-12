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
  {
    action: 'module-1__feature-3__attribute-3',
    subject: 'ABAC',
    conditions: { published: false },
    fields: ['title', 'description'],
    reason: 'You are not allowed to perform this action',
  },
];

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
  action,
  subj = 'ABAC',
  field = undefined,
  conditions = {},
  permissions = [],
}) => {
  // const rulesData = (permissions.length > 0 && permissions) || JSON.parse(localStorage?.getItem('userPermissions') || '[]');
  // OR
  const rulesData = (permissions.length > 0 && permissions);
  const ability = createMongoAbility(rulesData);
  return ability.can(action, subject(subj, conditions), field);
};


// Example
// console.log('hasAbility', hasAbility({ action: 'module-1__feature-1__attribute-1', permissions: rules })); // true
// if(hasAbility({ action: 'module-1__feature-1__attribute-1', permissions: rules })) {
//   <h1>Hello world!</h1> // component name here
// }

// Example 2
// console.log('hasAbility', hasAbility({
//   permissions: rules,
//   action: 'module-1__feature-2__attribute-2',
//   conditions: { published: true }
// })
// );

// Example 3
console.log('hasAbility', hasAbility({
  permissions: rules,
  action: 'module-1__feature-3__attribute-3',
  field: 'title',
  conditions: { published: false },
})
);
