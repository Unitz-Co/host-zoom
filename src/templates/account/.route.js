const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountDetail', {
  url: (params, ctx) => {
    const slug =
      _.get(params, 'slug') || _.get(ctx, 'account.slug') || _.get(getGbRoute().getPageContextParams(), 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    let queryString = '';
    if (slug) {
      return `/${slug}${queryString}`;
    }
    if (accountId) {
      queryString = routeStore.queryString({ accountId });
      return `/account${queryString}`;
    }
    return `/`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account';
  },
});
