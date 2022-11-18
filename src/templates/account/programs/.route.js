const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountPrograms', {
  url: (params) => {
    params = _.merge({}, params, _.get(getGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    if (slug) {
      return `/${slug}/programs${queryString}`;
    }
    if(accountId) {
      return `/account/programs${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/program${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/programs';
  },
});
