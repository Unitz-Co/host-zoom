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

// START USER MANAGEMENT

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

// END USER MANAGEMENT

// START PROGRAM TEMPLATE MANAGEMENT

routeStore.addRule('programTemplate', {
  url: () => {
    return `/accounts/me/program-template`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/program-template';
  },
});

routeStore.addRule('createProgramTemplate', {
  url: () => {
    return `/accounts/me/program-template/create`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/program-template/create';
  },
});

// START COURSE TEMPLATE MANAGEMENT

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

routeStore.addRule('courseTemplateDetail', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/course-template/detail?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template/detail';
  },
});

routeStore.addRule('courseTemplateEdit', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/course-template/edit?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course-template/edit';
  },
});

// END COURSE TEMPLATE MANAGEMENT

// START COURSE MANAGEMENT

routeStore.addRule('courses', {
  url: () => {
    return `/accounts/me/course`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course';
  },
});

routeStore.addRule('courseUseTemplates', {
  url: () => {
    return `/accounts/me/course/use-templates`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course/use-templates';
  },
});

routeStore.addRule('useCourseTemplate', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/course/use-template?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course/use-template';
  },
});

routeStore.addRule('createCourse', {
  url: () => {
    return `/accounts/me/course/create`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/course/create';
  },
});

// END COURSE MANAGEMENT
