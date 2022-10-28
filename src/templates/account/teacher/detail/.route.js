const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountTeacherReport', {
  url: (params, ctx) => {
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    const queryString = routeStore.queryString({ id: _.get(params, 'id') });
    if (accountSlug) {
      return `/${accountSlug}/teacher${queryString}`;
    }
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    if(accountId) {
      return `/account/teacher/detail${queryString}&accountId=${accountId}`;
    }
    return `/accounts/me/teacher/detail${queryString}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/teacher';
  },
});
