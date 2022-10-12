const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRoute');

routeStore.addRule('toolAccountCourseDetail', {
  url: (params, ctx) => {
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    const queryString = routeStore.queryString({ id: _.get(params, 'id') });
    if (accountSlug) {
      return `/${accountSlug}/course${queryString}`;
    }
    return `/accounts/me/course/detail${queryString}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/course';
  },
});
