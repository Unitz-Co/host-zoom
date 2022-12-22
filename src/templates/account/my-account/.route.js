const _ = require('lodash');
const slugify = require('slugify');
const { ACL } = require('@vl/mod-utils/ACL');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountMyAccount', {
  url: (params) => {
    if (!ACL.can('view_course')) return null;
    params = _.merge({}, params, _.get(getGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    const slug = _.get(params, 'slug');
    if (slug) {
      return `/${slug}/my-account${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/my-account${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/my-account';
  },
});
