### Granular Access Token:

- On the npm website, go to Access Tokens -> Generate New Token -> Granular Access Token.

- Give it "Read and Write" access to your packages.

- Check the box: "Allow this token to bypass Two-Factor Authentication".

- Copy that token.

- In Linux terminal, run: npm config set //registry.npmjs.org/:\_authToken=YOUR_TOKEN_HERE
