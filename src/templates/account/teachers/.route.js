const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountTeachers', {
  url: (params) => {
    params = _.merge({}, params, _.get(getGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    if (slug) {
      return `/${slug}/teachers${queryString}`;
    }
    if(accountId) {
      return `/account/teachers${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/teachers${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/teachers';
  },
});
