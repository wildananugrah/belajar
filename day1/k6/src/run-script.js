import http from 'k6/http';
import { sleep, check } from 'k6';

const host = 'http://localhost:3010';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp up to 10 users over 1 minute
    { duration: '2m', target: 30 }, // Stay at 30 users for 10 minutes
    { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

export default function () {

  // POST /user/login
  const res = http.post(`${host}/user/login`, JSON.stringify({
    "username": "testuser2",
    "password": "p@ssw0rd",
  }));
  check(res, { 'POST /user/login is 200': (r) => r.status === 200 });

  // sleep(1);
}
