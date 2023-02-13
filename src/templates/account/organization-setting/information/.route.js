const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
const { ACL } = require('@vl/mod-utils/ACL');

routeStore.addRule('toolAccountEdit', {
  url: (params, ctx) => {
    if (!ACL.can('edit_account')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ id: _.get(params, 'id'), accountId });
    if (accountSlug) {
      return `/${accountSlug}/settings/edit${queryString}`;
    }
    if (accountId) {
      return `/account/settings/edit${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/settings/edit${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/program/create';
  },
});
