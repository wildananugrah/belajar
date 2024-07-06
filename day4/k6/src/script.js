import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    // { duration: '1m', target: 1 }, // ramp-up to 1 user
    { duration: '5m', target: 10 }, // stay at 1 user for 5 minutes
    // { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

const host = 'http://localhost:3010';

export default function () {
  // Admin login
  let loginRes = http.post(`${host}/_/admin/login`, JSON.stringify({
    username: 'admin',
    password: 'p@ssw0rd',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login successful': (res) => res.status === 200,
  });

  let token = loginRes.json('token');

  // Create user
  let createUserRes = http.post(`${host}/user`, JSON.stringify({
    identifier: 'testuser1',
    password: 'p@ssw0rd',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(createUserRes, {
    'user created': (res) => res.status === 200,
  });

  // Get user
  let getUserRes = http.get(`${host}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(getUserRes, {
    'user fetched': (res) => res.status === 200,
  });

  let userId = getUserRes.json('data')[0].id;

  // Create role
  let createRoleRes = http.post(`${host}/role`, JSON.stringify({
    roleName: 'ADMIN',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(createRoleRes, {
    'role created': (res) => res.status === 200,
  });

  // Get role
  let getRoleRes = http.get(`${host}/role`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(getRoleRes, {
    'role fetched': (res) => res.status === 200,
  });

  let roleId = getRoleRes.json('data')[0].id;

  // Create role attribute
  let createRoleAttrRes = http.post(`${host}/role/attr`, JSON.stringify({
    module: 'app1',
    attributes: [{ name: 'uri1' }],
    roleId: roleId,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(createRoleAttrRes, {
    'role attribute created': (res) => res.status === 200,
  });

  // Get role attribute
  let getRoleAttrRes = http.get(`${host}/role/attr?roleId=${roleId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(getRoleAttrRes, {
    'role attribute fetched': (res) => res.status === 200,
  });

  let roleAttrId = getRoleAttrRes.json('data')[0].id;

  // Create user attribute
  let createUserAttrRes = http.post(`${host}/user/attr`, JSON.stringify({
    module: 'app1',
    attributes: [{ name: 'uri1' }],
    userId: userId,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(createUserAttrRes, {
    'user attribute created': (res) => res.status === 200,
  });

  // Get user attribute
  let getUserAttrRes = http.get(`${host}/user/attr?userId=${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(getUserAttrRes, {
    'user attribute fetched': (res) => res.status === 200,
  });

  let userAttrId = getUserAttrRes.json('data')[0].id;

  // Assign role to user
  let assignRoleRes = http.post(`${host}/user/role/${userId}`, JSON.stringify({
    roleId: roleId,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(assignRoleRes, {
    'role assigned to user': (res) => res.status === 200,
  });

  // Get user role
  let getUserRoleRes = http.get(`${host}/user/role/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(getUserRoleRes, {
    'user role fetched': (res) => res.status === 200,
  });

  let userRoleId = getUserRoleRes.json('data')[0].id;

  // Delete user role
  let deleteUserRoleRes = http.del(`${host}/user/role/${userRoleId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(deleteUserRoleRes, {
    'user role deleted': (res) => res.status === 200,
  });

  // Delete user attribute
  let deleteUserAttrRes = http.del(`${host}/user/attr/${userAttrId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(deleteUserAttrRes, {
    'user attribute deleted': (res) => res.status === 200,
  });

  // Delete role attribute
  let deleteRoleAttrRes = http.del(`${host}/role/attr/${roleAttrId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(deleteRoleAttrRes, {
    'role attribute deleted': (res) => res.status === 200,
  });

  // Delete role
  let deleteRoleRes = http.del(`${host}/role/${roleId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(deleteRoleRes, {
    'role deleted': (res) => res.status === 200,
  });

  // Delete user
  let deleteUserRes = http.del(`${host}/user/${userId}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  check(deleteUserRes, {
    'user deleted': (res) => res.status === 200,
  });

  sleep(1);
}
