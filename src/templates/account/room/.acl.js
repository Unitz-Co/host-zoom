const _ = require('lodash');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
const { ACL } = require('@vl/mod-utils/ACL');
const hasuraClient = require('@vl/mod-clients/hasuraApp');
const { flattenGet } = require('@vl/mod-utils/flattenGet');

const getTargetData = _.memoize(async () => {
  const client = hasuraClient.getClient();
  const route = getGbRoute();
  const routeParams = route.getParams();
  const room_id = _.get(routeParams, 'id');
  const targetData = await client.request(hasuraClient.gql`
    query {
      course_room: b2b_course_room_by_pk(id: "${room_id}") {
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
  `);
  return targetData;
});

ACL.extends({ room: {
  ACL,
  target: () => getTargetData(),
  async isTeacher() {
    const data = await this.target();
    const userId = await this.ACL.getUserId();
    const teachers = flattenGet(data, 'course_room.course.course_teacher.user_id');
    const isRoomTeacher = userId && teachers.includes(userId);
    return isRoomTeacher;
  },
  async isAttendee() {
    const data = await this.target();
    const userId = await this.ACL.getUserId();
    const attendees = flattenGet(data, 'course_room.course.course_room_attendees.user_id');
    const isRoomAttendee = userId && attendees.includes(userId);
    return isRoomAttendee;
  },
  async isMember() {
    const isRoomAttendee = await this.isAttendee();
    const isRoomTeacher = await this.isTeacher();
    const isRoomMember = isRoomAttendee || isRoomTeacher;
    return isRoomMember;
  },
  async isAdmin() {
    const isRoomAdmin = await this.ACL.checkAccess('edit_course');
    // const isRoomAdmin = false;
    return isRoomAdmin;
  },
} });

ACL.addRule('view_room', async () => {
  const isRoomAttendee = await ACL.room.isAttendee();
  const isRoomTeacher = await ACL.room.isTeacher();
  const isRoomMember = await ACL.room.isMember();
  const isRoomAdmin = await ACL.room.isAdmin();
  const check = _.some([isRoomMember, isRoomAttendee, isRoomTeacher, isRoomAdmin]);
  // console.log({ check, userId, isRoomMember, isRoomAttendee, isRoomTeacher, isRoomAdmin });
  return check;
});
