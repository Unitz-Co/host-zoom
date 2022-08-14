import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import HomePage from '@uz/unitz-pages/CFHomeLandingPage';
import withPageContext from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/ToolApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import SEO from '@uz/unitz-layout-web/SEO';

import PageData from '../data/PageDataQuery';

const HomeIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'HomePageLanding' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="px-2">
              <a href="/zoom_install">Install Zoom App</a>
            </div>
            <HomePage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default HomeIndex;
