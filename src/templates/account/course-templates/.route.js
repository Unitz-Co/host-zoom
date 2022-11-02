const _ = require('lodash');
const { ACL } = require('@vl/mod-utils/ACL');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountCourseTemplates', {
  url: (params, ctx) => {
    if (!ACL.can('view_course_template')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    const accountSlug = _.get(accountParams, 'slug');
    if (accountSlug) {
      return `/${accountSlug}/course-templates${queryString}`;
    }
    if (accountId) {
      return `/account/course-templates${queryString}`;
    }
    return `/accounts/me/course-templates`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/me/course-templates';
  },
});
