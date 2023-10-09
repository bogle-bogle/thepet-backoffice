import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import React, { useState } from 'react';

const colorList = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#321fdb',
  '#9da5b1',
  '#2eb85c',
  '#e55353',
  '#f9b115',
  '#3399ff',
  '#ebedef',
  '#4f5d73',
];

function SuggestionLog({ statistics }) {
  const { suggestionLog, mbtiLog } = statistics;

  return (
    <CContainer>
      <CRow>
        {suggestionLog !== undefined && (
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>AI 추천</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: suggestionLog.slice(0, 5).map((ele) => ele.element),
                    datasets: [
                      {
                        data: suggestionLog.slice(0, 5).map((ele) => ele.count),
                        backgroundColor: colorList.slice(0, 5),
                        hoverBackgroundColor: colorList.slice(0, 5),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {mbtiLog !== undefined && (
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>MBTI 추천</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: mbtiLog.slice(0, 5).map((ele) => ele.element),
                    datasets: [
                      {
                        data: mbtiLog.slice(0, 5).map((ele) => ele.count),
                        backgroundColor: colorList.slice(0, 5),
                        hoverBackgroundColor: colorList.slice(0, 5),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </CContainer>
  );
}

export default SuggestionLog;
