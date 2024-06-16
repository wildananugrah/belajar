wildananugrah@Wildans-MacBook-Pro k6 % npm run start:fastify;

> k6@1.0.0 start:fastify
> k6 run src/servo2.0-fastify.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-fastify.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"

     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✗ POST /v1/pre-assessment/full-package status is 200
      ↳  0% — ✓ 0 / ✗ 9638
     ✓ POST /v1/persona/create-result status is 200

     checks.........................: 80.00% ✓ 38552     ✗ 9638 
     data_received..................: 114 MB 126 kB/s
     data_sent......................: 22 MB  24 kB/s
     http_req_blocked...............: avg=5.75µs   min=1µs      med=3µs      max=12.19ms p(90)=5µs      p(95)=7µs     
     http_req_connecting............: avg=301ns    min=0s       med=0s       max=1.79ms  p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=305.88ms min=1.57ms   med=283.17ms max=4.7s    p(90)=562.87ms p(95)=636.47ms
       { expected_response:true }...: avg=235.45ms min=1.57ms   med=272.23ms max=3.69s   p(90)=328.91ms p(95)=363.7ms 
     http_req_failed................: 20.00% ✓ 9638      ✗ 38552
     http_req_receiving.............: avg=93.19µs  min=17µs     med=55µs     max=61.61ms p(90)=111µs    p(95)=146µs   
     http_req_sending...............: avg=27.58µs  min=6µs      med=19µs     max=28.3ms  p(90)=34µs     p(95)=46µs    
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=305.76ms min=1.51ms   med=283.08ms max=4.7s    p(90)=562.69ms p(95)=636.41ms
     http_reqs......................: 48190  53.510656/s
     iteration_duration.............: avg=1.53s    min=905.48ms med=1.46s    max=5.86s   p(90)=1.83s    p(95)=2.04s   
     iterations.....................: 9638   10.702131/s
     vus............................: 1      min=1       max=30 
     vus_max........................: 30     min=30      max=30 


running (15m00.6s), 00/30 VUs, 9638 complete and 0 interrupted iterations
default ✓ [=================================] 00/30 VUs  15m0s
ERRO[0902] thresholds on metrics 'http_req_duration' have been crossed 
wildananugrah@Wildans-MacBook-Pro k6 % 

wildananugrah@Wildans-MacBook-Pro k6 % npm run start:fastify 

> k6@1.0.0 start:fastify
> k6 run src/servo2.0-fastify.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-fastify.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 200
     ✓ POST /v1/persona/create-result status is 200

     checks.........................: 100.00% ✓ 5        ✗ 0  
     data_received..................: 66 kB   33 kB/s
     data_sent......................: 2.3 kB  1.1 kB/s
     http_req_blocked...............: avg=439.6µs  min=3µs     med=4µs      max=2.18ms   p(90)=1.31ms   p(95)=1.74ms  
     http_req_connecting............: avg=36.79µs  min=0s      med=0s       max=184µs    p(90)=110.4µs  p(95)=147.19µs
     http_req_duration..............: avg=400.98ms min=15.55ms med=314.08ms max=903.19ms p(90)=733.56ms p(95)=818.38ms
       { expected_response:true }...: avg=400.98ms min=15.55ms med=314.08ms max=903.19ms p(90)=733.56ms p(95)=818.38ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 5  
     http_req_receiving.............: avg=154.79µs min=56µs    med=109µs    max=408µs    p(90)=292µs    p(95)=349.99µs
     http_req_sending...............: avg=51.6µs   min=20µs    med=35µs     max=91µs     p(90)=90.6µs   p(95)=90.8µs  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=400.78ms min=15.46ms med=313.97ms max=902.99ms p(90)=733.24ms p(95)=818.12ms
     http_reqs......................: 5       2.486202/s
     iteration_duration.............: avg=2s       min=2s      med=2s       max=2s       p(90)=2s       p(95)=2s      
     iterations.....................: 1       0.49724/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1


running (00m02.0s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [=======] 1 VUs  00m02.0s/10m0s  1/1 iters, 1 per VU
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:fastify

> k6@1.0.0 start:fastify
> k6 run src/servo2.0-fastify.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-fastify.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

^C
     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 200
     ✓ POST /v1/persona/create-result status is 200

     checks.........................: 100.00% ✓ 130      ✗ 0   
     data_received..................: 1.6 MB  79 kB/s
     data_sent......................: 57 kB   2.8 kB/s
     http_req_blocked...............: avg=73.9µs   min=1µs   med=3µs      max=8.22ms   p(90)=5µs      p(95)=7.54µs  
     http_req_connecting............: avg=7.53µs   min=0s    med=0s       max=273µs    p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=319.17ms min=986µs med=280.82ms max=998.17ms p(90)=728.2ms  p(95)=774.41ms
       { expected_response:true }...: avg=319.17ms min=986µs med=280.82ms max=998.17ms p(90)=728.2ms  p(95)=774.41ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 130 
     http_req_receiving.............: avg=71.73µs  min=30µs  med=58µs     max=345µs    p(90)=125.6µs  p(95)=151.1µs 
     http_req_sending...............: avg=22.56µs  min=9µs   med=18µs     max=164µs    p(90)=33.1µs   p(95)=46.19µs 
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=319.08ms min=916µs med=280.77ms max=997.99ms p(90)=728.06ms p(95)=774.25ms
     http_reqs......................: 130     6.295216/s
     iteration_duration.............: avg=1.62s    min=1.4s  med=1.61s    max=1.82s    p(90)=1.79s    p(95)=1.82s   
     iterations.....................: 24      1.162194/s
     vus............................: 3       min=1      max=3 
     vus_max........................: 30      min=30     max=30


running (00m20.7s), 00/30 VUs, 24 complete and 4 interrupted iterations
default ✗ [---------------------] 04/30 VUs  00m20.6s/15m00.0s
^C
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:fastify

> k6@1.0.0 start:fastify
> k6 run src/servo2.0-fastify.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-fastify.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

^C
     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 200
     ✓ POST /v1/persona/create-result status is 200

     checks.........................: 100.00% ✓ 6        ✗ 0   
     data_received..................: 70 kB   21 kB/s
     data_sent......................: 2.6 kB  806 B/s
     http_req_blocked...............: avg=405µs    min=3µs    med=4µs      max=2.41ms p(90)=1.2ms    p(95)=1.81ms  
     http_req_connecting............: avg=59.16µs  min=0s     med=0s       max=355µs  p(90)=177.5µs  p(95)=266.25µs
   ✗ http_req_duration..............: avg=533.18ms min=1.63ms med=472.11ms max=1.27s  p(90)=992.77ms p(95)=1.13s   
       { expected_response:true }...: avg=533.18ms min=1.63ms med=472.11ms max=1.27s  p(90)=992.77ms p(95)=1.13s   
     http_req_failed................: 0.00%   ✓ 0        ✗ 6   
     http_req_receiving.............: avg=161.83µs min=69µs   med=87.5µs   max=557µs  p(90)=329µs    p(95)=443µs   
     http_req_sending...............: avg=112.33µs min=19µs   med=25.5µs   max=545µs  p(90)=290.5µs  p(95)=417.75µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=532.91ms min=1.54ms med=472ms    max=1.27s  p(90)=992.16ms p(95)=1.13s   
     http_reqs......................: 6       1.838274/s
     iteration_duration.............: avg=2.93s    min=2.93s  med=2.93s    max=2.93s  p(90)=2.93s    p(95)=2.93s   
     iterations.....................: 1       0.306379/s
     vus............................: 1       min=1      max=1 
     vus_max........................: 30      min=30     max=30


running (00m03.3s), 00/30 VUs, 1 complete and 1 interrupted iterations
default ✗ [---------------------] 01/30 VUs  00m03.3s/15m00.0s
^C
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:fastify

> k6@1.0.0 start:fastify
> k6 run src/servo2.0-fastify.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-fastify.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 10 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 200
     ✓ POST /v1/persona/create-result status is 200

     checks.........................: 100.00% ✓ 7305      ✗ 0   
     data_received..................: 97 MB   322 kB/s
     data_sent......................: 3.3 MB  11 kB/s
     http_req_blocked...............: avg=14µs     min=0s       med=3µs      max=61.47ms  p(90)=5µs      p(95)=6µs     
     http_req_connecting............: avg=361ns    min=0s       med=0s       max=359µs    p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=333.52ms min=690µs    med=259.41ms max=12.2s    p(90)=649.53ms p(95)=749.04ms
       { expected_response:true }...: avg=333.52ms min=690µs    med=259.41ms max=12.2s    p(90)=649.53ms p(95)=749.04ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 7305
     http_req_receiving.............: avg=176.29µs min=16µs     med=60µs     max=199.48ms p(90)=136.6µs  p(95)=187.79µs
     http_req_sending...............: avg=38.99µs  min=5µs      med=18µs     max=36.33ms  p(90)=31µs     p(95)=39µs    
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=333.3ms  min=649µs    med=259.31ms max=12.2s    p(90)=649.18ms p(95)=748.92ms
     http_reqs......................: 7305    24.251407/s
     iteration_duration.............: avg=1.66s    min=935.46ms med=1.48s    max=14.82s   p(90)=1.85s    p(95)=2.36s   
     iterations.....................: 1461    4.850281/s
     vus............................: 1       min=1       max=10
     vus_max........................: 10      min=10      max=10


running (5m01.2s), 00/10 VUs, 1461 complete and 0 interrupted iterations
default ✓ [==================================] 00/10 VUs  5m0s
ERRO[0304] thresholds on metrics 'http_req_duration' have been crossed 
wildananugrah@Wildans-MacBook-Pro k6 % 