import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutZoom';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import HomePage from '@uz/unitz-tool-pages/AccountCreate';
import Navbar from '@uz/unitz-tool-components/Navbar';
import PageData from '../../../data/PageDataQuery';

const CreateOrganizationIdx = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">
            <Navbar />
          </Layout.POS>
          <Layout.POS name="app-body">
            <div className="bg-background1 h-screen">
              <div className="wrapper app-row py-0">
                <HomePage />
              </div>
            </div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default CreateOrganizationIdx;
