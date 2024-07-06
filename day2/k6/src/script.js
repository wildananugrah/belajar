import http from 'k6/http';
import { check } from 'k6';

const host = 'http://localhost:3010';

export let options = {
  // stages: [
  //   { duration: '30m', target: 15 },
  // ],
  vus: 10,
  duration: '5m',
  thresholds: {
    'http_req_duration': ['p(95)<500']
  },
};

function setup() {
  // Perform user registration and login to get an authentication token
  const registerRes = http.post(`${host}/user/register`, JSON.stringify({
    "identifier": "testuser1",
    "password": "p@ssw0rd"
  }), { headers: { 'Content-Type': 'application/json' } });
  check(registerRes, { 'registered in successfully': r => r.status === 200 });

  const loginRes = http.post(`${host}/user/login`, JSON.stringify({
    "identifier": "testuser1",
    "password": "p@ssw0rd"
  }), { headers: { 'Content-Type': 'application/json' } });

  check(loginRes, { 'logged in successfully': r => r.status === 200 });

  return { authToken: loginRes.json('token') };
}

export default function () {

  const data = setup();

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.authToken}`
    }
  };

  // Create a todo
  const createTodoRes = http.post(`${host}/todo`, JSON.stringify({
    "name": "todo 1",
    "description": "todo 1 description"
  }), params);
  check(createTodoRes, { 'created todo successfully': r => r.status === 200 });
  const todoId = createTodoRes.json('id');

  // Read all todos
  const readTodosRes = http.get(`${host}/todo`, params);
  check(readTodosRes, { 'Read all todos successfully': r => r.status === 200 });

  // Read specific todo
  const getTodoDetailRes = http.get(`${host}/todo/${todoId}`, params);
  check(getTodoDetailRes, { 'Read specific todo successfully': r => r.status === 200 });

  // Update a todo
  const updateTodoRes = http.put(`${host}/todo/${todoId}`, JSON.stringify({
    "name": "todo 1 update",
    "description": "todo 1 description update"
  }), params);
  check(updateTodoRes, { 'Update specific todo successfully': r => r.status === 200 });

  // Re-read the updated todo
  const reReadRes = http.get(`${host}/todo/${todoId}`, params);
  check(reReadRes, { 'Re-Read the updated todo successfully': r => r.status === 200 });

  // Delete the todo
  const deleteTodoRes = http.del(`${host}/todo/${todoId}`, null, params);
  check(deleteTodoRes, { 'Delete todo successfully': r => r.status === 200 });

  // Delete the user
  const deleteUserRes = http.del(`${host}/user`, null, params);
  check(deleteUserRes, { 'Delete user successfully': r => r.status === 200 });

  // Optional: add sleep for real-time simulation between actions
  // sleep(1);
}

