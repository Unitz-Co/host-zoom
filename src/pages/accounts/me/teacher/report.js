import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutZoomToolMenu';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import HomePage from '@uz/unitz-tool-pages/TeacherReport';
import Navbar from '@uz/unitz-tool-components/Navbar';
import PageData from '../../../../data/PageDataQuery';

const TeacherReportIdx = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">
            <Navbar />
          </Layout.POS>
          <Layout.POS name="app-body">
            <HomePage />
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default TeacherReportIdx;
