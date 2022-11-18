const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { ACL } = require('@vl/mod-utils/ACL');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountCourseTemplateCreate', {
  url: (params, ctx) => {
    if(!ACL.can('add_course')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    if (accountSlug) {
      return `/${accountSlug}/course-template/create${queryString}`;
    }
    if(accountId) {
      return `/account/course-template/create${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/course-template/create${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/course-template/create';
  },
});
