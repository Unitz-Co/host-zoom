import React from 'react';
import _ from 'lodash';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';
import PlanUpgradePage from '@uz/unitz-tool-pages/BillingPlanUpgrade';

// import PlansPage from '@uz/unitz-tool-pages/PlansPage';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import PageData from '../../../data/PageDataQuery';


const PlansIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'AuthPage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'HomeBizNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <PlanUpgradePage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'AuthBizFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default PlansIndex;
