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

routeStore.addRule('userNotification', {
  url: () => {
    return `/accounts/me/notifications`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/notifications';
  },
});

routeStore.addRule('userCalendar', {
  url: () => {
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
    return urlObject.pathname === 'accounts/me/calendar';
  },
});

routeStore.addRule('myAccount', {
  url: () => {
    return `/accounts/me/my-account`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/my-account';
  },
});

routeStore.addRule('userSetting', {
  url: () => {
    return `/accounts/me/settings`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/settings';
  },
});

// START USER MANAGEMENT

routeStore.addRule('accountMembers', {
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

routeStore.addRule('programs', {
  url: () => {
    return `/accounts/me/program`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/program';
  },
});

// START PROGRAM TEMPLATE MANAGEMENT

routeStore.addRule('programTemplates', {
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

routeStore.addRule('programTemplateCreated', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/program-template/created?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/program-template/created';
  },
});

routeStore.addRule('programTemplateDetail', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/accounts/me/program-template/detail?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/program-template/detail';
  },
});

// START COURSE TEMPLATE MANAGEMENT

routeStore.addRule('courseTemplates', {
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

// Start Teacher

routeStore.addRule('teachers', {
  url: () => {
    return `/accounts/me/teacher`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/teacher';
  },
});

routeStore.addRule('teacherReport', {
  url: (params) => {
    const id = _.get(params, 'user_id', 'unknown');
    return `/accounts/me/teacher/report?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/teacher/report';
  },
});

// End Teacher

// Start student

routeStore.addRule('students', {
  url: () => {
    return `/accounts/me/student`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/student';
  },
});

routeStore.addRule('studentReport', {
  url: (params) => {
    const id = _.get(params, 'user_id', 'unknown');
    return `/accounts/me/student/report?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'accounts/me/student/report';
  },
});

// End student
