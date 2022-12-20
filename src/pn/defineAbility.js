let users = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
  {
    id: 3,
    name: 'Joe Doe',
  },
];

let roles = [
  {
    id: 1,
    name: 'admin',
    description: 'Admin',
    userId: 1,
  },
  {
    id: 2,
    name: 'user',
    description: 'User',
    userId: 2,
  },
  {
    id: 3,
    name: 'guest',
    description: 'Guest',
    userId: 3,
  },
  {
    id: 4,
    name: 'moderator',
    description: 'Moderator',
    userId: 3,
  }
];

let permissions = [
  {
    id: 1,
    name: 'some name 1',
    description: 'Some permission 1',
    roleId: 1,
  },
  {
    id: 2,
    name: 'some name 2',
    description: 'Some permission 2',
    roleId: 2,
  },
  {
    id: 3,
    name: 'some name 3',
    description: 'Some permission 3',
    roleId: 2,
  },
];

let user_role = [
  {
    user_id: 1,
    role_id: 1
  },
  {
    user_id: 1,
    role_id: 2
  },
];

let role_permissions = [
  {
    role_id: 1,
    permission_id: 1,
  },
  {
    role_id: 1,
    permission_id: 2,
  },
  {
    role_id: 1,
    permission_id: 3,
  },
  {
    role_id: 2,
    permission_id: 1,
  },
  {
    role_id: 1,
    permission_id: 3,
  },
];

// get permissions based on role
function getPermissions(roleId) {
  // select * from roles INNIER JOIN role_permissions ON role_permissions.role_id = roles.role_id
}

// to check has permissions
function hasPermission(roleId, permissions = []) {
  // select * from role_permissions where role_id = roleId and permission_id = permissions
}

