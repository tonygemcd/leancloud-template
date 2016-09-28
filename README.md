# LeanCloud Template

## Features
#### Server:


## Development

``` bash
npm install

# start server
npm run dev

```

## Production

Remove codes in server/index.js
``` js
require('babel-register')({
  sourceMaps: true
})
```

``` bash
# compiler by babel
npm run build
```

## Deployment

Change `npm run start` scripts

```
# For development
"start": "node --debug server/index.js"

# For production
"start": "node dist/server.js"
```
