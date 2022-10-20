const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const useGbRoute = require('@vl/hooks/useGbRouteDe');
const querystring = require('querystring');

routeStore.addRule('toolAccountCalendar', {
  url: (params) => {
    params = _.merge({}, params, _.get(useGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    if (slug) {
      return `/${slug}/calendar`;
    }
    return `/accounts/me/calendar`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/calendar';
  },
});
