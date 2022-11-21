const _ = require('lodash');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
const { ACL } = require('@vl/mod-utils/ACL');
const hasuraClient = require('@vl/mod-clients/hasuraApp');
const { flattenGet } = require('@vl/mod-utils/flattenGet');

ACL.extends({ room: {
  ACL,
  async target(target) {
    let room_id;
    if(_.isString(target) || _.isNumber(target)) {
      room_id = target;
    }
    if(!room_id) {
      room_id = _.get(target, 'id');
    }
    if(!room_id) {
      const route = getGbRoute();
      const routeParams = route.getParams();
      room_id = _.get(routeParams, 'id');
    }

    const query = `
      query ($room_id: uuid!){
        course_room: b2b_course_room_by_pk(id: $room_id) {
          course_id
          course {
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
            course_room_attendees {
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
      }
    `;
    const targetData = await hasuraClient.getClient().watch(query, { room_id });
    return targetData;  
  },
  async isTeacher(...args) {
    const data = await this.target(...args);
    const userId = await this.ACL.getUserId();
    const teachers = flattenGet(data, 'course_room.course.course_teacher.user_id');
    const isRoomTeacher = userId && teachers.includes(userId);
    return isRoomTeacher;
  },
  async isAttendee(...args) {
    const data = await this.target(...args);
    const userId = await this.ACL.getUserId();
    const attendees = flattenGet(data, 'course_room.course.course_room_attendees.user_id');
    const isRoomAttendee = userId && attendees.includes(userId);
    return isRoomAttendee;
  },
  async isMember(...args) {
    const isRoomAttendee = await this.isAttendee(...args);
    const isRoomTeacher = await this.isTeacher(...args);
    const isRoomMember = isRoomAttendee || isRoomTeacher;
    return isRoomMember;
  },
  async isAdmin(...args) {
    // const isRoomAdmin = false;
    const isRoomAdmin = await this.ACL.checkAccess('edit_course');
    return isRoomAdmin;
  },
  async canView(...args) {
    // const isRoomAdmin = false;
    const isRoomAdmin = await this.ACL.checkAccess('edit_course');
    return isRoomAdmin;
  },
} });

ACL.addRule('view_room', async () => {
  const isRoomAttendee = await ACL.room.isAttendee();
  const isRoomTeacher = await ACL.room.isTeacher();
  const isRoomMember = await ACL.room.isMember();
  const isRoomAdmin = await ACL.room.isAdmin();
  const check = _.some([isRoomMember, isRoomAttendee, isRoomTeacher, isRoomAdmin]);
  return check;
});
