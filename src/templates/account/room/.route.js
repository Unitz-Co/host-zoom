const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { getGbRoute } = require('@vl/hooks/useGbRouteDe');
const { ACL } = require('@vl/mod-utils/ACL');

routeStore.addRule('toolAccountRoomDetail', {
  url: (params, ctx) => {
    const accountParams = _.get(ctx, 'account') || getGbRoute().getPageContextParams();
    const accountSlug = _.get(accountParams, 'slug');
    let accountId = _.get(getGbRoute().getParams(), 'accountId');
    const queryString = routeStore.queryString({ id: _.get(params, 'id'), accountId });
    if (accountSlug) {
      return `/${accountSlug}/room${queryString}`;
    }
    if(accountId) {
      return `/account/room${queryString}`;
    }
    return `${getGbRoute().getDefaultAccountRoute(`/room${queryString}`)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'account/room';
  },
});

ACL.addRule('view_room', () => {
  const route = getGbRoute();
  const pageContext = route.getPageContext();
  const routeParams = route.getParams();
  const room_id = _.get(routeParams, 'id');
  // console.log('room_idroom_id', routeParams, room_id, pageContext);
  return true;
});
