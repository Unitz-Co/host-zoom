const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const useGbRoute = require('@vl/hooks/useGbRoute');
const querystring = require('querystring');

routeStore.addRule('toolAccountCourseDetail', {
  url: (params) => {
    const accountParams = _.get(useGbRoute().getPageContext(), 'params');
    // params = _.merge({}, params, _.get(useGbRoute().getPageContext(), 'params'));
    console.log({ params, accountParams });
    const id = _.get(params, 'id');
    const accountSlug = _.get(accountParams, 'slug');
    const courseId = _.get(params, 'id');
    if (accountSlug) {
      if (!accountParams) return `/${accountSlug}/course/detail`;
      return `/${accountSlug}/course/detail?id=${courseId}`;
    }
    return `/account/course/detail?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/course/course/detail';
  },
});
