import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';

import FormReset from '@uz/unitz-components-web/FormReset';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import PageData from '../data/PageDataQuery';

const ResetIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'AuthPage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'HomeBizNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="wrapper app-row">
              <h2 className="section-headline">Reset Password</h2>
              <FormReset />
            </div>
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'AuthBizFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default ResetIndex;
