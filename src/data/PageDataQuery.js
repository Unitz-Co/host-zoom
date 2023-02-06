import React from 'react';
import _ from 'lodash';
import useGbRouteDe from '@vl/hooks/useGbRouteDe';

import PageData_de from './locales/de';
import PageData_en from './locales/en';
import 'moment/locale/de';
import 'moment/locale/en-gb';

const locales = {
  de: PageData_de,
  en: PageData_en,
};

export const PageData = ({ children }) => {
  // eslint-disable-next-line
  const pageContext = useGbRouteDe().getPageContext();

  const lang = _.get(pageContext, 'lang', 'de');
  const Component = _.get(locales, lang);
  if (lang) {
    // eslint-disable-next-line
    return <Component children={children} />;
  }
  return null;
};

export default PageData;