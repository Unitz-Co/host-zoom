const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils-biz');

require('@vl/mod-config/builder');
require('@vl/mod-config/web').loadEnv();

const { getAllAccounts } = require('@uz/unitz-tool-pages/pageBuilder');

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

      const accountSlug = routeStore.toUrl('toolAccountProgramTemplateEdit', {}, { account });
      const accountPath = localeConfig.langSlug(path.join('/', accountSlug));
      console.log('creating page', accountPath);
      const pageContext = _.cloneDeep({
        aid: accountId,
        accountId,
        slug: accountSlug,
        lang: localeConfig.get('lang'),
        permissions: ['add_program_template', 'edit_program_template'],
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
