import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';

// import HomePage from '@uz/unitz-pages/CFHomeZoomPage';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import App from '@uz/unitz-app-web/ToolApp';
import HomePage from '@uz/unitz-tool-pages/Home';

import Layout from '@uz/unitz-layout-web/LayoutZoom';
import SEO from '@uz/unitz-layout-web/SEO';
import Announcement from '@uz/unitz-components-web/Announcement';
import Navbar from '@uz/unitz-tool-components/Navbar';
import PageData from '../data/PageDataQuery';
import '../styles/styles.css';

const HomeIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'HomePageLanding' })} />
          {/* <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS> */}
          <Layout.POS name="app-header">
            <Navbar />
          </Layout.POS>
          <Layout.POS name="app-body">
            <Announcement />
            <HomePage />
          </Layout.POS>
          {/* <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS> */}
        </DIV>
      </Layout>
    </App>
  );
});

export default HomeIndex;
