import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import {
  CChartBar
} from "@coreui/react-chartjs";

function Productstatistics() {
  const random = () => Math.round(Math.random() * 100);

  return (
    <CRow>
      <CCol xs={12}>
        <h3>
          <strong>🏆지난 달 상품별 매출 순위 TOP5 (매달 1일 자동 갱신)</strong>
        </h3>
        <div>&nbsp;</div>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <CChartBar
              data={{
                labels: ["January", "February", "March", "April", "May"],
                datasets: [
                  {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [220, 20, 12, 39, 10],
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">순위</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품코드</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col">월 판매량</CTableHeaderCell>
                  <CTableHeaderCell scope="col">월 매출</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell>아이디</CTableHeaderCell>
                  <CTableDataCell>이미지</CTableDataCell>
                  <CTableDataCell>이름</CTableDataCell>
                  <CTableDataCell>가격원</CTableDataCell>
                  <CTableDataCell>가격원</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Productstatistics;
