const _ = require('lodash');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
const { ACL } = require('@vl/mod-utils/ACL');
const hasuraClient = require('@vl/mod-clients/hasuraApp');
const { flattenGet } = require('@vl/mod-utils/flattenGet');

ACL.extends({ course: {
  ACL,
  async target(target) {
    let course_id;
    if(_.isString(target) || _.isNumber(target)) {
      course_id = target;
    }
    if(!course_id) {
      course_id = _.get(target, 'id');
    }
    if(!course_id) {
      const route = getGbRoute();
      const routeParams = route.getParams();
      course_id = _.get(routeParams, 'id');
    }

    const query = `
      query ($course_id: uuid!){
        course: b2b_course_by_pk(id: $course_id) {
          id
          course_teacher {
            role
            user_id
            member {
              id
              member_profile {
                first_name
                last_name
                email
                avatar_url
              }
            }
          }
          course_course_attendees {
            user_id
            member {
              id
              member_profile {
                first_name
                last_name
                email
              }
            }
          }
        }
      }
    `;
    const targetData = await hasuraClient.getClient().watch(query, { course_id });
    return targetData;
  },
  async isTeacher(...args) {
    const data = await this.target(...args);
    const userId = await this.ACL.getUserId();
    const teachers = flattenGet(data, 'course.course_teacher.user_id');
    const isCourseTeacher = userId && teachers.includes(userId);
    return isCourseTeacher;
  },
  async isAttendee(...args) {
    const data = await this.target(...args);
    const userId = await this.ACL.getUserId();
    const attendees = flattenGet(data, 'course.course_course_attendees.user_id');
    const isCourseAttendee = userId && attendees.includes(userId);
    return isCourseAttendee;
  },
  async isMember(...args) {
    const isCourseAttendee = await this.isAttendee(...args);
    const isCourseTeacher = await this.isTeacher(...args);
    const isCourseMember = isCourseAttendee || isCourseTeacher;
    return isCourseMember;
  },
  async isAdmin(...args) {
    // const isCourseAdmin = false;
    const isCourseAdmin = await this.ACL.checkAccess('edit_course');
    return isCourseAdmin;
  },
} });

ACL.addRule('display_course', async () => {
  const isCourseAttendee = await ACL.course.isAttendee();
  const isCourseTeacher = await ACL.course.isTeacher();
  const isCourseMember = await ACL.course.isMember();
  const isCourseAdmin = await ACL.course.isAdmin();
  const check = _.some([isCourseMember, isCourseAttendee, isCourseTeacher, isCourseAdmin]);
  return check;
});
