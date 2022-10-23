const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { ACL } = require('@vl/mod-utils/ACL');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountProgramTemplateCreate', {
  url: (params, ctx) => {
    if(!ACL.can('add_program_template')) return null;
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    const queryString = routeStore.queryString({ id: _.get(params, 'id') });
    if (accountSlug) {
      return `/${accountSlug}/program-template/create${queryString}`;
    }
    return `/accounts/me/program-template/create${queryString}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/program-template/create';
  },
});
