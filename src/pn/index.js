const {
  createMongoAbility,
  ForbiddenError,
} = require('@casl/ability');

const rules = [
  {
    action: 'read',
    subject: 'Article'
  },
  {
    // inverted: true, // (inverted = true) === can not
    action: 'delete',
    subject: 'Article',
    conditions: { published: false },
    reason: 'You are not allowed to delete this article',
  },
  {
    action: 'delete',
    subject: 'Article',
    conditions: { authorId: 2 },
    reason: 'You are not allowed to delete this article',
  },
  {
    action: 'module-1__feature-2__attribute-1',
    subject: 'ABAC',
    reason: 'You are not allowed to delete this article',
  }
];

const ability = createMongoAbility(rules);

// this can be pulled from a database
const user = {
  id: 2,
  isAdmin: false,
}

// entities which can be pulled from a database
class Article {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}
class ABAC {
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

const abac = new ABAC();

// Example: 1, checking with try catch block for showing exceptions
// try {
//   // checking ability before taking some action
//   ForbiddenError.from(ability).throwUnlessCan('delete', anotherArticle);
//   //return true;
// } catch (error) {
//   console.log(error.message);
// return false;
// }

// Example: 2, directly checking
// const result = ability.can('delete', anotherArticle);
// const result = ability.can('read', ownArticle);
const result = ability.can('module-1__feature-2__attribute-1', abac); // redux or exported result

console.log('result', result);

// if(result) {
//   <h1>Hello world!</h1> // component name here
// }
