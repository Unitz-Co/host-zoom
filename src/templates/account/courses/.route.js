const _ = require('lodash');
const { ACL } = require('@vl/mod-utils/ACL');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountCourses', {
  url: (params, ctx) => {
    if(!ACL.can('view_course')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    const accountSlug = _.get(accountParams, 'slug');
    if (accountSlug) {
      return `/${accountSlug}/courses${queryString}`;
    }
    if(accountId) {
      return `/account/courses${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/courses${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/courses';
  },
});
