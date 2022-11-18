const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
require('./.acl');

routeStore.addRule('toolAccountRoomDetail', {
  url: (params, ctx) => {
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ id: _.get(params, 'id'), accountId });
    if (accountSlug) {
      return `/${accountSlug}/room${queryString}`;
    }
    if(accountId) {
      return `/account/room${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/room${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/room';
  },
});
