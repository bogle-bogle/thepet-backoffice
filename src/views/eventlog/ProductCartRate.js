import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";

import React from "react";

function ProductCartRate({ statistics }) {
  const random = () => Math.round(Math.random() * 100);
  const { yrateList, nrateList } = statistics;

  return (
    <CContainer>
      <CRow>
        {yrateList !== undefined && (
          <CCol xs={6}>
            <CCard className="mb-4">
              <CCardHeader>Line Chart</CCardHeader>
              <CCardBody>
                <CChartLine
                  data={{
                    labels: yrateList.slice(0, 10).map((ele) => ele.element),
                    datasets: [
                      {
                        label: "총 접근 횟수",
                        backgroundColor: "rgba(178, 34, 34, 0.2)",
                        borderColor: "rgba(178, 34, 34, 1)",
                        pointBackgroundColor: "rgba(178, 34, 34, 1)",
                        pointBorderColor: "#fff",
                        data: yrateList.slice(0, 10).map((ele) => ele.total),
                      },
                      {
                        label: "장바구니에 담긴 횟수",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        pointBackgroundColor: "rgba(0, 0, 255, 1)",
                        pointBorderColor: "#fff",
                        data: yrateList
                          .slice(0, 10)
                          .map((ele) => ele.isClickedCount),
                      },
                      {
                        label: "접근 대비 장바구니 담긴 비율",
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        borderColor: "rgba(218, 165, 32, 1)",
                        pointBackgroundColor: "rgba(218, 165, 32, 1)",
                        pointBorderColor: "#fff",
                        data: yrateList
                          .slice(0, 10)
                          .map((ele) => ele.rate * 100),
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {nrateList !== undefined && (
          <CCol xs={6}>
            <CCard className="mb-4">
              <CCardHeader>Line Chart</CCardHeader>
              <CCardBody>
                <CChartLine
                  data={{
                    labels: nrateList.slice(0, 10).map((ele) => ele.element),
                    datasets: [
                      {
                        label: "총 접근 횟수",
                        backgroundColor: "rgba(178, 34, 34, 0.2)",
                        borderColor: "rgba(178, 34, 34, 1)",
                        pointBackgroundColor: "rgba(178, 34, 34, 1)",
                        pointBorderColor: "#fff",
                        data: nrateList.slice(0, 10).map((ele) => ele.total),
                      },
                      {
                        label: "장바구니에 담기지 않은 횟수",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        pointBackgroundColor: "rgba(0, 0, 255, 1)",
                        pointBorderColor: "#fff",
                        data: nrateList
                          .slice(0, 10)
                          .map((ele) => ele.isClickedCount),
                      },
                      {
                        label: "접근 대비 장바구니 담기지 않은 비율",
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        borderColor: "rgba(218, 165, 32, 1)",
                        pointBackgroundColor: "rgba(218, 165, 32, 1)",
                        pointBorderColor: "#fff",
                        data: nrateList
                          .slice(0, 10)
                          .map((ele) => ele.rate * 100),
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

export default ProductCartRate;
