const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { ACL } = require('@vl/mod-utils/ACL');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountMember', {
  url: (params, ctx) => {
    if(!ACL.can('view_member')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    const accountSlug = _.get(accountParams, 'slug');
    if (accountSlug) {
      return `/${accountSlug}/members${queryString}`;
    }
    if(accountId) {
      return `/account/members${queryString}`;
    }
    return `/accounts/me/members`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/me/members';
  },
});
