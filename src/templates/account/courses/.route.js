const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRoute');

routeStore.addRule('toolAccountCourses', {
  url: (params) => {
    params = _.merge({}, params, _.get(getGbRoute().getPageContext(), 'params'));
    const id = _.get(params, 'id');
    const slug = _.get(params, 'slug');
    if(slug) {
      return `/${slug}/courses`;
    }
    return `/account/course`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/courses';
  },
});

