const _ = require('lodash');
const { ACL } = require('@vl/mod-utils/ACL');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountCourses', {
  url: (params, ctx) => {
    if(!ACL.can('view_course')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    if (accountSlug) {
      return `/${accountSlug}/courses`;
    }
    return `/accounts/me/courses`;
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
