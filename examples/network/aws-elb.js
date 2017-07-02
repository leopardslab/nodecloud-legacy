const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider("AWS", process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};

const elb = ncAWS.loadbalancer(options);

const params = {
  Listeners: [
    {
      InstancePort: 80,
      InstanceProtocol: "HTTP",
      LoadBalancerPort: 80,
      Protocol: "HTTP"
    }
  ],
  LoadBalancerName: "my-load-balancer",
  SecurityGroups: ["sg-a61988c3"],
  Subnets: ["subnet-15aaab61"]
};

// create AWS ELB (loadbalancer)
elb
  .create(params)
  .then(res => {
    console.log(`Load balancer created ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

const params = {
  LoadBalancerName: "my-load-balancer",
  LoadBalancerPorts: [80]
};

// remove AWS ELB (loadbalancer)
elb
  .delete(params)
  .then(res => {
    console.log(`Load balancer deleted ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

const params = {
  LoadBalancerNames: ["my-load-balancer"]
};

// list load balancers
elb
  .list(params)
  .then(res => {
    console.log(`Load balancers ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

const params = {
  LoadBalancerNames: ["my-load-balancer"],
  Tags: [
    {
      Key: "project",
      Value: "lima"
    },
    {
      Key: "department",
      Value: "digital-media"
    }
  ]
};

// add tags to load balancers
elb
  .addTags(params)
  .then(res => {
    console.log(`Tag added to load balancer ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

const params = {
  LoadBalancerNames: ["my-load-balancer"],
  Tags: [
    {
      Key: "project"
    }
  ]
};

// remove tags to load balancers
elb
  .removeTags(params)
  .then(res => {
    console.log(`Tags removed from Load balancers ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
