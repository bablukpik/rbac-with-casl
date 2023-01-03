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

/**
* Checks attributes based access control permissions
* @param {string} attributeId - The attributeId is needed for checking access, i.e: module-2__feature-4__attribute-24
* @param {object} attrs - The attrs is needed for condition property, i.e:
    {
      action: 'module-2__feature-4__attribute-24',
      subject: 'ABAC',
      conditions: { active: true },
      reason: 'You are not allowed to access this resource',
    }
* @param {object} permissions - Permissions data initialization, i.e:
    [
      {
        action: 'module-2__feature-4__attribute-24',
        subject: 'ABAC',
        reason: 'You are not allowed to access this resource',
      },
    ]
  @returns {boolean} - true/false
*/

const hasAbility = (
  attributeId,
  attrs = {},
  permissions = [],
) => {
  // const rulesData = (permissions.length > 0 && permissions) || JSON.parse(localStorage?.getItem('userPermissions') || '[]');
  const rulesData = (permissions.length > 0 && permissions);
  const ability = createMongoAbility(rulesData);
  return ability.can(attributeId, subject('ABAC', attrs));
};

console.log('hasAbility', hasAbility('module-1__feature-1__attribute-1', {}, rules));

// if(hasAbility('module-1__feature-2__attribute-1', {}, rules)) {
//   <h1>Hello world!</h1> // component name here
// }
