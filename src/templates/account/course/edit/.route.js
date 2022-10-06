const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const useGbRoute = require('@vl/hooks/useGbRoute');
const querystring = require('querystring');

routeStore.addRule('toolAccountCourseEdit', {
  url: (params, ctx) => {
    const accountParams = _.get(ctx, 'account') || useGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    const queryString = routeStore.queryString({ id: _.get(params, 'id') });
    if (accountSlug) {
      return `/${accountSlug}/course/edit${queryString}`;
    }
    return `/account/course/edit${queryString}`;
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
