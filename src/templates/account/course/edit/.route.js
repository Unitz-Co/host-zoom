const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { ACL } = require('@vl/mod-utils/ACL');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountCourseEdit', {
  url: (params, ctx) => {
    if(!ACL.can('edit_course', params)) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ id: _.get(params, 'id'), accountId });
    if (accountSlug) {
      return `/${accountSlug}/course/edit${queryString}`;
    }
    if(accountId) {
      return `/account/course/edit${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/course/edit${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/course/edit';
  },
});
