const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('toolCreateAccount', {
  url: (params) => {
    return `/account/create`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/create';
  },
});
