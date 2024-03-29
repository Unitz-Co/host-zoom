const _ = require('lodash');
const slugify = require('slugify');
const { ACL } = require('@vl/mod-utils/ACL');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');

routeStore.addRule('toolAccountProgramTemplates', {
  url: (params) => {
    if (!ACL.can('add_program') || !ACL.can('view_program_template')) return null;
    params = _.merge({}, params, _.get(getGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ accountId });
    if (slug) {
      return `/${slug}/program-templates${queryString}`;
    }
    if (accountId) {
      return `/account/program-templates${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/program-templates${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/program-templates';
  },
});
