import {
  CButtonGroup,
  CFormCheck,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import React from 'react';
import { useState } from 'react';
import MainLog from './MainLog';
import { useEffect } from 'react';

import * as Api from '../../api';
import SuggestionLog from './SuggestionLog';
import ProductCartRate from './ProductCartRate';

function EventLog() {
  const [checkedButton, setCheckedButton] = useState('main');
  // const [statistics, setStatistics] = useState();

  const [mainStatistics, setMainStatistics] = useState();
  const [recommendStatistics, setRecommendStatistics] = useState();
  const [shopStatistics, setShopStatistics] = useState();

  useEffect(() => {
    Api.get(`/api/backoffice/event/main`).then((res) => {
      setMainStatistics(() => res.data);
    });
    Api.get(`/api/backoffice/event/recommend`).then((res) => {
      setRecommendStatistics(() => res.data);
    });
    Api.get(`/api/backoffice/event/shop`).then((res) => {
      setShopStatistics(() => res.data);
    });
  }, []);

  const handleMemberCheckbox = (e) => {
    const { id } = e.target;
    setCheckedButton(() => id);

    Api.get(`/api/backoffice/event/${id}`).then((res) => {
      setStatistics(() => res.data);
    });
  };

  const createChart = () => {
    // if (checkedButton === 'main') {
    //   return <MainLog statistics={statistics}></MainLog>;
    // } else if (checkedButton === 'recommend') {
    //   return <SuggestionLog statistics={statistics}></SuggestionLog>;
    // } else if (checkedButton === 'shop') {
    //   return <ProductCartRate statistics={statistics}></ProductCartRate>;
    // }

    return (
      <>
        <MainLog statistics={mainStatistics}></MainLog>
        <SuggestionLog statistics={recommendStatistics}></SuggestionLog>
        <ProductCartRate statistics={shopStatistics}></ProductCartRate>
      </>
    );
  };
  return (
    <>
      {/* <CButtonGroup
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <CFormCheck
          type="radio"
          button={{ color: 'dark', variant: 'outline' }}
          name="member"
          id="main"
          autoComplete="off"
          label="메인"
          defaultChecked={checkedButton === 'main'}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: 'dark', variant: 'outline' }}
          name="member"
          id="recommend"
          autoComplete="off"
          label="추천"
          defaultChecked={checkedButton === 'recommend'}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: 'dark', variant: 'outline' }}
          name="member"
          id="shop"
          autoComplete="off"
          label="쇼핑"
          defaultChecked={checkedButton === 'shop'}
          onClick={handleMemberCheckbox}
        />
      </CButtonGroup> */}
      <CListGroup>
        <CListGroupItem
          color={'success'}
          component="a"
          href="https://analytics.google.com/analytics/web/#/p406873212/reports/explorer?params=_u..nav%3Dmaui&r=all-pages-and-screens&ruid=all-pages-and-screens,business-objectives,examine-user-behavior&collectionId=business-objectives"
          target="_blank"
        >
          Google Analytics 이동
        </CListGroupItem>
      </CListGroup>
      <br />

      {mainStatistics !== undefined &&
        recommendStatistics !== undefined &&
        shopStatistics !== undefined &&
        createChart()}
    </>
  );
}

export default EventLog;
