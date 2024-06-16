wildananugrah@Wildans-MacBook-Pro k6 % npm run start:nest

> k6@1.0.0 start:nest
> k6 run src/servo2.0-nestjs.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-nestjs.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✗ POST /v1/pre-assessment/full-package status is 201
      ↳  0% — ✓ 0 / ✗ 9474
     ✓ POST /v1/persona/create-result status is 201

     checks.........................: 80.00% ✓ 37896     ✗ 9474 
     data_received..................: 113 MB 126 kB/s
     data_sent......................: 22 MB  24 kB/s
     http_req_blocked...............: avg=7.02µs   min=1µs      med=3µs      max=90.05ms p(90)=5µs      p(95)=7µs     
     http_req_connecting............: avg=709ns    min=0s       med=0s       max=8ms     p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=311.21ms min=1.33ms   med=287.68ms max=4.49s   p(90)=565.53ms p(95)=640.31ms
       { expected_response:true }...: avg=240.99ms min=1.33ms   med=275.36ms max=3.26s   p(90)=341.85ms p(95)=388.37ms
     http_req_failed................: 20.00% ✓ 9474      ✗ 37896
     http_req_receiving.............: avg=83.66µs  min=19µs     med=57µs     max=40.14ms p(90)=115µs    p(95)=151µs   
     http_req_sending...............: avg=23.94µs  min=6µs      med=19µs     max=6.42ms  p(90)=34µs     p(95)=46µs    
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=311.11ms min=1.28ms   med=287.58ms max=4.49s   p(90)=565.38ms p(95)=640.11ms
     http_reqs......................: 47370  52.585752/s
     iteration_duration.............: avg=1.55s    min=984.76ms med=1.49s    max=5.67s   p(90)=1.84s    p(95)=2.03s   
     iterations.....................: 9474   10.51715/s
     vus............................: 1      min=1       max=30 
     vus_max........................: 30     min=30      max=30 


running (15m00.8s), 00/30 VUs, 9474 complete and 0 interrupted iterations
default ✓ [==============================] 00/30 VUs  15m0s
ERRO[0904] thresholds on metrics 'http_req_duration' have been crossed 
wildananugrah@Wildans-MacBook-Pro k6 % 

wildananugrah@Wildans-MacBook-Pro k6 % npm run start:nest

> k6@1.0.0 start:nest
> k6 run src/servo2.0-nestjs.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-nestjs.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"

     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 201
     ✓ POST /v1/persona/create-result status is 201

     checks.........................: 100.00% ✓ 5        ✗ 0  
     data_received..................: 67 kB   39 kB/s
     data_sent......................: 2.3 kB  1.3 kB/s
     http_req_blocked...............: avg=535.59µs min=2µs    med=5µs      max=2.65ms   p(90)=1.59ms   p(95)=2.12ms  
     http_req_connecting............: avg=46.2µs   min=0s     med=0s       max=231µs    p(90)=138.6µs  p(95)=184.79µs
     http_req_duration..............: avg=337.4ms  min=8.67ms med=284.03ms max=813.39ms p(90)=607.44ms p(95)=710.41ms
       { expected_response:true }...: avg=337.4ms  min=8.67ms med=284.03ms max=813.39ms p(90)=607.44ms p(95)=710.41ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 5  
     http_req_receiving.............: avg=388.99µs min=105µs  med=165µs    max=1.32ms   p(90)=885.4µs  p(95)=1.1ms   
     http_req_sending...............: avg=48.8µs   min=24µs   med=29µs     max=127µs    p(90)=91µs     p(95)=108.99µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=336.96ms min=8.51ms med=283.68ms max=812.03ms p(90)=606.57ms p(95)=709.3ms 
     http_reqs......................: 5       2.955988/s
     iteration_duration.............: avg=1.69s    min=1.69s  med=1.69s    max=1.69s    p(90)=1.69s    p(95)=1.69s   
     iterations.....................: 1       0.591198/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1


running (00m01.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  00m01.7s/10m0s  1/1 iters, 1 per VU
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:nest

> k6@1.0.0 start:nest
> k6 run src/servo2.0-nestjs.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-nestjs.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"

     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 201
     ✓ POST /v1/persona/create-result status is 201

     checks.........................: 100.00% ✓ 132      ✗ 0   
     data_received..................: 1.6 MB  79 kB/s
     data_sent......................: 58 kB   2.8 kB/s
     http_req_blocked...............: avg=22.71µs  min=1µs    med=3µs      max=1.73ms   p(90)=5.9µs    p(95)=10.34µs 
     http_req_connecting............: avg=6.53µs   min=0s     med=0s       max=252µs    p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=325.09ms min=2.91ms med=295.18ms max=915.13ms p(90)=738.18ms p(95)=811.47ms
       { expected_response:true }...: avg=325.09ms min=2.91ms med=295.18ms max=915.13ms p(90)=738.18ms p(95)=811.47ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 132 
     http_req_receiving.............: avg=292.06µs min=32µs   med=77.5µs   max=4.92ms   p(90)=771.1µs  p(95)=1.04ms  
     http_req_sending...............: avg=31.98µs  min=11µs   med=20.5µs   max=964µs    p(90)=37µs     p(95)=48µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=324.77ms min=2.83ms med=295.06ms max=914.29ms p(90)=737.54ms p(95)=809.06ms
     http_reqs......................: 132     6.34833/s
     iteration_duration.............: avg=1.64s    min=1.37s  med=1.64s    max=1.8s     p(90)=1.79s    p(95)=1.8s    
     iterations.....................: 24      1.154242/s
     vus............................: 3       min=1      max=3 
     vus_max........................: 30      min=30     max=30


running (00m20.8s), 00/30 VUs, 24 complete and 4 interrupted iterations
default ✗ [------------------] 04/30 VUs  00m20.8s/15m00.0s
^C
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:nest

> k6@1.0.0 start:nest
> k6 run src/servo2.0-nestjs.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-nestjs.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 15m30s max duration (incl. graceful stop):
              * default: Up to 30 looping VUs for 15m0s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"
^C
     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 201
     ✓ POST /v1/persona/create-result status is 201

     checks.........................: 100.00% ✓ 8        ✗ 0   
     data_received..................: 78 kB   19 kB/s
     data_sent......................: 3.1 kB  775 B/s
     http_req_blocked...............: avg=115.12µs min=3µs    med=4.5µs    max=891µs p(90)=270.79µs p(95)=580.89µs
     http_req_connecting............: avg=24.25µs  min=0s     med=0s       max=194µs p(90)=58.19µs  p(95)=126.09µs
   ✗ http_req_duration..............: avg=430.14ms min=7.72ms med=262.95ms max=1.45s p(90)=903.81ms p(95)=1.17s   
       { expected_response:true }...: avg=430.14ms min=7.72ms med=262.95ms max=1.45s p(90)=903.81ms p(95)=1.17s   
     http_req_failed................: 0.00%   ✓ 0        ✗ 8   
     http_req_receiving.............: avg=205µs    min=72µs   med=111µs    max=890µs p(90)=362.89µs p(95)=626.44µs
     http_req_sending...............: avg=82µs     min=15µs   med=38µs     max=333µs p(90)=169.89µs p(95)=251.44µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=429.85ms min=7.31ms med=262.83ms max=1.45s p(90)=903.11ms p(95)=1.17s   
     http_reqs......................: 8       1.972447/s
     iteration_duration.............: avg=2.65s    min=2.65s  med=2.65s    max=2.65s p(90)=2.65s    p(95)=2.65s   
     iterations.....................: 1       0.246556/s
     vus............................: 1       min=1      max=1 
     vus_max........................: 30      min=30     max=30


running (00m04.1s), 00/30 VUs, 1 complete and 1 interrupted iterations
default ✗ [------------------] 01/30 VUs  00m04.1s/15m00.0s
^C
wildananugrah@Wildans-MacBook-Pro k6 % npm run start:nest

> k6@1.0.0 start:nest
> k6 run src/servo2.0-nestjs.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: src/servo2.0-nestjs.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 10 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0000] Error from API server                         error="listen tcp 127.0.0.1:6565: bind: address already in use"

     ✓ GET /v1/instance/config/stagingintegro status is 200
     ✓ GET /v1/pre-assessment/instruction/1/id status is 200
     ✓ GET /v1/pre-assessment/simulation/1 status is 200
     ✓ POST /v1/pre-assessment/full-package status is 201
     ✓ POST /v1/persona/create-result status is 201

     checks.........................: 100.00% ✓ 7490      ✗ 0   
     data_received..................: 100 MB  331 kB/s
     data_sent......................: 3.4 MB  11 kB/s
     http_req_blocked...............: avg=8.18µs   min=1µs    med=3µs      max=8.87ms  p(90)=6µs      p(95)=7µs     
     http_req_connecting............: avg=285ns    min=0s     med=0s       max=270µs   p(90)=0s       p(95)=0s      
   ✗ http_req_duration..............: avg=325.14ms min=1.82ms med=266.93ms max=4.87s   p(90)=666.03ms p(95)=746.15ms
       { expected_response:true }...: avg=325.14ms min=1.82ms med=266.93ms max=4.87s   p(90)=666.03ms p(95)=746.15ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 7490
     http_req_receiving.............: avg=497.8µs  min=21µs   med=77µs     max=70.24ms p(90)=1.03ms   p(95)=1.67ms  
     http_req_sending...............: avg=33.9µs   min=6µs    med=21µs     max=8.81ms  p(90)=38µs     p(95)=54µs    
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=324.61ms min=1.76ms med=266.79ms max=4.87s   p(90)=664.7ms  p(95)=744.74ms
     http_reqs......................: 7490    24.859329/s
     iteration_duration.............: avg=1.62s    min=1.12s  med=1.49s    max=6.46s   p(90)=1.89s    p(95)=2.35s   
     iterations.....................: 1498    4.971866/s
     vus............................: 1       min=1       max=10
     vus_max........................: 10      min=10      max=10


running (5m01.3s), 00/10 VUs, 1498 complete and 0 interrupted iterations
default ✓ [===============================] 00/10 VUs  5m0s
ERRO[0303] thresholds on metrics 'http_req_duration' have been crossed 
wildananugrah@Wildans-MacBook-Pro k6 % 