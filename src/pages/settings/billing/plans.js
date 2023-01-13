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
import PageData from '../../../data/PageDataQuery';

const getClientToken = async () => {
  try {
    const authModel = getREF().getRef('authModel');
    const user_id = await authModel?.getUserId();
    console.log('firebasefirebase', user_id);
    const res = await fbFnsClient.getClient().post('payment-clientToken', {
      ...(user_id ? { user_id } : {}),
    });
    const client_token = _.get(res, 'client_token');
    if (client_token) {
      return client_token;
    }
    console.log('resresresres', res);
  } catch (err) {
    console.log(err);
  }
};

const PlansPage = () => {
  const ref = React.useRef({});
  const [bindStatus, $bindStatus] = React.useState(false);
  const loadedStatus = useScript('https://js.braintreegateway.com/web/dropin/1.33.7/js/dropin.min.js');

  React.useEffect(() => {
    if (loadedStatus === 'ready') {
      const braintree = window.braintree;
      if (braintree) {
        (async () => {
          const clientToken = await getClientToken();
          if (!clientToken) {
            return;
          }
          console.log('clientTokenclientToken', clientToken);
          braintree.dropin.create({
            authorization: clientToken,
            container: '#dropin-container',
            threeDSecure: true,
            // paypal: {
            //   flow: 'vault',
            // },
            card: {
              cardholderName: {
                required: false
              }
            }
            // locale: 'de_DE',
          }, (createErr, instance) => {
            $bindStatus(true);
            ref.current.instance = instance;
          });
        })();
      }
    }
  }, [loadedStatus]);

  const onRequestPaymentMethod = React.useCallback(async () => {
    const { instance } = ref.current;
    if (instance) {
      const authModel = getREF().getRef('authModel');
      const user_id = await authModel?.getUserId();
      const accountModel = getREF().getRef('accountModel');
      const account_id = await accountModel?.getAccountId();
      await new Promise((resolve, reject) => {
        instance.requestPaymentMethod({
          threeDSecure: {
            amount: '199.00',
            email: 'hungtran0203@gmail.com',
            billingAddress: {
              givenName: 'Hung',
              surname: 'Tran',
              phoneNumber: '123-456-7890',
              streetAddress: '123 XYZ Street',
              extendedAddress: '',
              locality: 'Anytown',
              region: 'IL',
              postalCode: '12345',
              countryCodeAlpha2: 'US'
            }
          },
        }, async (err, payload) => {
          if (err) {
            return reject(err);
          }
          console.log('payload', payload, user_id, account_id);
          const resData = await fbFnsClient.getClient().post('payment-createSubscription', {
            ...(user_id ? { user_id } : {}),
            ...(account_id ? { account_id } : {}),
            plan_id: 'unitz_plan_professional',
            paymentMethodNonce: payload.nonce,
          });
          console.log('resData', resData);
          resolve(payload);
        });
      });
    }
  }, [ref]);

  if (loadedStatus !== 'ready') {
    return null;
  }
  return (
    <div>
      <div id="dropin-container"></div>
      {!!bindStatus &&
        <Button onClick={onRequestPaymentMethod}>
          Request payment method
        </Button>
      }
    </div>
  );
};

const PlansIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'AuthPage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'HomeBizNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <PlansPage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'AuthBizFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default PlansIndex;
