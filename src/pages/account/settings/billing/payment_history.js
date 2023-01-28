import React from 'react';


import { Button } from '@uz/unitz-components-web/Button';
import useScript from '@vl/hooks/useScript';
import { getREF } from '@uz/unitz-providers/RefProvider';
import fbFnsClient from '@vl/mod-clients/fibGatsbyFns';
import _ from 'lodash';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import displayName from '@vl/redata/displayName.macro';

// import PlansPage from '@uz/unitz-tool-pages/PlansPage';

import App from '@uz/unitz-app-web/ToolApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-tool-pages/withPageContext';
import PageData from '../../../../data/PageDataQuery';


const PlansIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'AuthPage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'HomeBizNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div>
              Payment history
            </div>
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'AuthBizFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default PlansIndex;
