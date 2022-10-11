const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

require('@vl/mod-config/builder');
require('@vl/mod-config/web').loadEnv();

const hasuraClient = require('@vl/mod-clients/hasuraCtf');

const getAllAccounts = async () => {
  const query = hasuraClient.gql`
    query account {
      account: b2b_account {
        id
        slug
        account_profile {
          id
          display_name
          avatar_url
        }
      }
    }
  `;
  try {
    const rtn = await hasuraClient.getClient().request(query);

    const data = _.get(rtn, 'account', []);
    return data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

exports.createPages = withLocale(async function(item, gatsby) {
  // return [];
  const localeConfig = this;
  const accounts = await getAllAccounts();

  return Promise.all(
    accounts.map((accountData) => {
      const accountId = _.get(accountData, 'id');
      const account = {
        ...accountData,
        accountId,
        profile: {
          ...accountData.account_profile,
        },
      };

      const accountSlug = routeStore.toUrl('toolAccountTeacherReport', {}, { account });
      const accountPath = localeConfig.langSlug(path.join('/', accountSlug));
      console.log('creating page', accountPath);
      const pageContext = _.cloneDeep({
        id: accountId,
        accountId,
        slug: accountSlug,
        lang: localeConfig.get('lang'),
        params: {
          ..._.omit(account, ['id']),
          accountId,
        },
      });
      return gatsby.actions.createPage({
        path: accountPath,
        component: item.resolvers.component(gatsby),
        context: pageContext,
      });
    })
  );
});
