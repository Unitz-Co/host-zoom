import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';

import HomePage from '@uz/unitz-pages/CFHomeZoomPage';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import App from '@uz/unitz-app-web/ToolApp';

import Layout from '@uz/unitz-layout-web/LayoutZoom';
import SEO from '@uz/unitz-layout-web/SEO';
import { Button } from '@uz/unitz-components-web/Button';
import Navbar from '@uz/unitz-tool-components/Navbar';
import PageData from '../data/PageDataQuery';
import '../styles/styles.css';

const ZoomIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'HomePageLanding' })} />
          <Layout.POS name="app-header">
            <Navbar />
          </Layout.POS>
          <Layout.POS name="app-body">
            <div className="px-2">
              <a
                href={`https://zoom.us/oauth/authorize?response_type=code&client_id=pGEImldqTKi7EUaRC0FBhQ&redirect_uri=https%3A%2F%2Funitz-zoom.web.app%2Fzoom_oauth`}
              >
                Click to install zoom
              </a>
              <Button
                className="mx-2"
                type="primary"
                size="small"
                onClick={() => {
                  window.location.href = `https://us06web.zoom.us/j/7124174735?pwd=dWFvS1NxN1ZpWUxjbm41REk2c0NSZz09`;
                }}
              >
                Join meeting
              </Button>
            </div>
            <HomePage />
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default ZoomIndex;
