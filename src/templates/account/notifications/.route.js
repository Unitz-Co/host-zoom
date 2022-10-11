const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const useGbRoute = require('@vl/hooks/useGbRoute');
const querystring = require('querystring');

routeStore.addRule('toolAccountNotification', {
  url: (params) => {
    params = _.merge({}, params, _.get(useGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    if (slug) {
      return `/${slug}/notifications`;
    }
    return `/account/notifications`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/notifications';
  },
});
