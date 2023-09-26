import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
import React from "react";

const colorList = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#321fdb",
  "#9da5b1",
  "#2eb85c",
  "#e55353",
  "#f9b115",
  "#3399ff",
  "#ebedef",
  "#4f5d73",
];

function MainLog({ statistics }) {
  const { mainLog, bannerLog, recommendLog } = statistics;

  return (
    <CContainer>
      <CRow>
        {mainLog !== undefined && (
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>메인 페이지 로그</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: mainLog.map((ele) => ele.element),
                    datasets: [
                      {
                        data: mainLog.map((ele) => ele.count),
                        backgroundColor: colorList.slice(0, mainLog.length),
                        hoverBackgroundColor: colorList.slice(
                          0,
                          mainLog.length
                        ),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {bannerLog !== undefined && (
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>배너 클릭</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: bannerLog.map((ele) => ele.element),
                    datasets: [
                      {
                        data: bannerLog.map((ele) => ele.count),
                        backgroundColor: colorList.slice(0, bannerLog.length),
                        hoverBackgroundColor: colorList.slice(
                          0,
                          bannerLog.length
                        ),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {recommendLog !== undefined && (
          <CCol xs={4}>
            <CCard className="mb-4">
              <CCardHeader>추천 상품 클릭</CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: recommendLog.map((ele) => ele.element),
                    datasets: [
                      {
                        data: recommendLog.map((ele) => ele.count),
                        backgroundColor: colorList.slice(
                          0,
                          recommendLog.length
                        ),
                        hoverBackgroundColor: colorList.slice(
                          0,
                          recommendLog.length
                        ),
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

export default MainLog;
