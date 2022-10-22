const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountDetail', {
  url: (params, ctx) => {
    const slug = _.get(params, 'slug') || _.get(ctx, 'account.slug') || _.get(getGbRoute().getPageContextParams(), 'slug');
    if (slug) {
      return `/${slug}`;
    }
    return `/accounts/me`;
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
