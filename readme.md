SMT Leaderboard Challenge

Steps to start the server:
1. Run: npm install
2. Run: npm run test
3. Navigate to http://localhost:3001

You can also test the API endpoint with postman by sending a GET request to http://localhost:3001/data

You can also check the javascript console in the browser to determine if the dataset is being loaded successfully.

If this error is encountered on Linux:
node: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.28' not found (required by node)

Run:
nvm use v14.17.6