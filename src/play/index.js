const {
  AbilityBuilder,
  createMongoAbility,
  ForbiddenError,
} = require('@casl/ability');

/*
 * Admins can do anything
 * Non-admin users can:
 * - Read any article
 * - Edit article they own
 * - Cannot publish a article
 * - Cannot delete any article
 */

const rules = [
  {
    action: 'read',
    subject: 'Article'
  },
  {
    // inverted: true,
    action: 'delete',
    subject: 'Article',
    conditions: { published: false },
    reason: 'You are not allowed to delete this article',
  }
];

const ability = createMongoAbility(rules);

// this can be pulled from a database
const user = {
  id: 5,
  isAdmin: false,
}

// this can be pulled from a database
class Article {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}
const ownArticle = new Article({ authorId: user.id });
const anotherArticle = new Article({
  authorId: 2,
  published: false,
  content: 'Lorem Ipsum',
});

try {
  // checking ability before taking some action
  ForbiddenError.from(ability).throwUnlessCan('delete', anotherArticle);
} catch (error) {
  console.log(error.message);
}

const result = ability.can('delete', anotherArticle);

console.log('result', result);


