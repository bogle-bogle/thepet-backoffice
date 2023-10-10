import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilTags,
  cilStar,
  cilBabyCarriage,
  cilBarChart,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: '회원 관리',
    to: '/member',
    icon: (
      <CIcon
        icon={cilSpeedometer}
        customClassName="nav-icon"
        style={{ color: 'black' }}
      />
    ),
  },
  // {
  //   component: CNavItem,
  //   name: '상품 목록',
  //   to: '/product',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },

  {
    component: CNavGroup,
    name: '매출 전략 통계',
    to: '/statistics',
    icon: (
      <CIcon
        icon={cilBarChart}
        customClassName="nav-icon"
        style={{ color: 'black' }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: '상품 통계',
        to: '/statistics/productstatistics',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '상품 등록',
    to: '/productregister',
    icon: (
      <CIcon
        icon={cilTags}
        customClassName="nav-icon"
        style={{ color: 'black' }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: '구독 상품 등록',
        to: '/productregister/curation',
      },
      {
        component: CNavItem,
        name: '일반 상품 등록',
        to: '/productregister/general',
      },
    ],
  },
  {
    component: CNavItem,
    name: '로그 통계',
    to: '/eventlog',
    icon: (
      <CIcon
        icon={cilSpeedometer}
        customClassName="nav-icon"
        style={{ color: 'black' }}
      />
    ),
  },
  {
    component: CNavGroup,
    name: '흰디카 (반려견 트롤리) ',
    to: '/heendycar',
    icon: (
      <CIcon
        icon={cilBabyCarriage}
        customClassName="nav-icon"
        style={{ color: 'black' }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: '예약 현황 및 관리',
        to: '/heendycar/BranchHeendyCar',
      },
    ],
  },
];

export default _nav;
