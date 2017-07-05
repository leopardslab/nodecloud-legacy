const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const elb = ncAWS.loadbalancer(options);

describe('AWS ELB', () => {
  before(() => {});

  it('should create load balancer', (done) => {
    nock('https://elasticloadbalancing.us-west-2.amazonaws.com')
      .post('/')
      .reply(200, {
        ResponseMetadata: { RequestId: '4e14130c-5f20-11e7-9f5f-974abd456ffe' },
        DNSName: 'nc-load-balancer-2026285120.us-west-2.elb.amazonaws.com',
      });

    const params = {
      Listeners: [
        {
          InstancePort: 80,
          InstanceProtocol: 'HTTP',
          LoadBalancerPort: 80,
          Protocol: 'HTTP',
        },
      ],
      LoadBalancerName: 'nc-load-balancer',
      SecurityGroups: ['sg-a61988c3'],
      Subnets: ['subnet-15aaab61'],
    };

    elb.create(params).then((res) => {
      assert.equal(
        res.ResponseMetadata.RequestId,
        '4e14130c-5f20-11e7-9f5f-974abd456ffe',
      );
      done();
    });
  });

  it('should list load balancers', (done) => {
    nock('https://elasticloadbalancing.us-west-2.amazonaws.com')
      .post('/')
      .reply(200, {
        ResponseMetadata: { RequestId: '16bec5ba-5f21-11e7-8d11-fdae63aad735' },
        LoadBalancerDescriptions: [
          {
            LoadBalancerName: 'nc-load-balancer',
            DNSName: 'nc-load-balancer-2026285120.us-west-2.elb.amazonaws.com',
            CanonicalHostedZoneName: 'nc-load-balancer-2026285120.us-west-2.elb.amazonaws.com',
          },
        ],
      });

    const params = {
      LoadBalancerNames: ['nc-load-balancer'],
    };

    elb.list(params).then((res) => {
      assert.equal(
        res.ResponseMetadata.LoadBalancerDescriptions.LoadBalancerName,
        'nc-load-balancer',
      );
      done();
    });
  });

  it('should add tags to load balancers', (done) => {
    nock('https://elasticloadbalancing.us-west-2.amazonaws.com')
      .post('/')
      .reply(200, {
        ResponseMetadata: { RequestId: '12bc1d5b-5f2b-11e7-90e2-c949c44528d8' },
      });

    const params = {
      LoadBalancerNames: ['nc-load-balancer'],
      Tags: [
        {
          Key: 'project-2',
          Value: 'limaa',
        },
      ],
    };

    elb.addTags(params).then((res) => {
      assert.equal(
        res.ResponseMetadata.RequestId,
        '12bc1d5b-5f2b-11e7-90e2-c949c44528d8',
      );
      done();
    });
  });

  it('should remove tags to load balancers', (done) => {
    nock('https://elasticloadbalancing.us-west-2.amazonaws.com')
      .post('/')
      .reply(200, {
        ResponseMetadata: { RequestId: '3b97dc89-5f2b-11e7-8d11-fdae63aad735' },
      });

    const params = {
      LoadBalancerNames: ['nc-load-balancer'],
      Tags: [
        {
          Key: 'project',
        },
      ],
    };

    elb.removeTags(params).then((res) => {
      assert.equal(
        res.ResponseMetadata.RequestId,
        '3b97dc89-5f2b-11e7-8d11-fdae63aad735',
      );
      done();
    });
  });

  it('should remove/delete load balancer', (done) => {
    nock('https://elasticloadbalancing.us-west-2.amazonaws.com')
      .post('/')
      .reply(200, {
        ResponseMetadata: { RequestId: '6624f5e0-5f2b-11e7-a202-6336cc1e8d62' },
      });

    const params = {
      LoadBalancerName: 'nc-load-balancer',
      LoadBalancerPorts: [80],
    };

    elb.delete(params).then((res) => {
      assert.equal(
        res.ResponseMetadata.RequestId,
        '6624f5e0-5f2b-11e7-a202-6336cc1e8d62',
      );
      done();
    });
  });
});
