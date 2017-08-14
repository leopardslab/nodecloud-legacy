# NodeCloud database - NoSQL - Google (Google Cloud Platform / GCP)

## Configure GCP credentials

- Download `keyFile` from `GCP` console
- Set environment variables

```
GCLOUD_PROJECT='nodecloud-demo',
GCLOUD_KEY_FILE_NAME='xxxxxxxxxxx'
```

## Initialize library

```js
const nodeCloud = require("nodecloud");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
const gcd = ncGoogle.nosql();
```

### Create item

```js
const params = {
  key: 'Google',
  data: {
    name: 'Google',
    location: 'CA',
  },
};

gcd.createItem(params)
  .then((res) => {
    console.log(res);
  })
  .error((err) => {
    console.error(err);
  });
```

### Delete item

```js
const params = {
  key: ['Company', 'Google'],
};

gcd.deleteItem(params)
  .then((res) => {
    console.log(res);
  })
  .error((err) => {
    console.error(err);
  });
```

### Update item

```js
const params = {
  key: 'Company',
  data: {
    rating: '10',
  },
};

gcd.updateItem(params)
  .then((res) => {
    console.log(res);
  })
  .error((err) => {
    console.error(err);
  });
```

### Run query

```js
const query = gcd.getQuery({
  key: 'Google',
});

query.limit(5);

gcd.query({ query })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

