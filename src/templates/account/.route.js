const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const querystring = require('querystring');

routeStore.addRule('accounts', {
  url: (params) => {
    let search = `${querystring.stringify(params)}`;
    search = search ? `?${search}` : '';
    return `/accounts/me${search}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me';
  },
});

routeStore.addRule('accountMember', {
  url: () => {
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
    return urlObject.pathname === 'accounts/me/members';
  },
});

routeStore.addRule('courseTemplate', {
  url: () => {
    return `/accounts/me/course-template`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template';
  },
});

routeStore.addRule('createCourseTemplate', {
  url: () => {
    return `/accounts/me/course-template/create`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template/create';
  },
});

routeStore.addRule('courseTemplateCreated', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/course-template/created?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template/created';
  },
});

routeStore.addRule('useCourseTemplate', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/course-template/use?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template/use';
  },
});
