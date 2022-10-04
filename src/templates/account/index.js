import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';
import _ from 'lodash';
import Layout from '@uz/unitz-layout-web/LayoutMain';
// import AdvisorProfile from '@uz/unitz-pages/AdvisorProfile';
import HomePage from '@uz/unitz-tool-pages/Dashboard';
import withPageContext from '@uz/unitz-pages/withPageContext';
import useRoute from '@vl/hooks/useGbRoute';
import PageData from '../../data/PageDataQuery';

export const component = withPageContext((props) => {
  // const pageContext = useRoute().getPageContext();
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'B2BNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <HomePage />
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
