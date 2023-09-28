import React, { useEffect, useState } from 'react';
import * as Api from '../../../api';
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
  CCardHeader,
} from '@coreui/react';
import { CChartDoughnut } from '@coreui/react-chartjs';

function Productstatistics() {
  const [monthTop10Data, setMonthTop10Data] = useState([]);
  const [mainCategoryData, setMainCategoryData] = useState({});

  useEffect(() => {
    Api.get(`/api/backoffice/top10`)
      .then((response) => {
        const fetchedData = response.data;
        console.log(fetchedData);
        setMonthTop10Data(fetchedData.slice(0, 10));

        const frequency = fetchedData.reduce((acc, item) => {
          const code = item.mainCategoryCode;
          acc[code] = (acc[code] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(frequency);
        const data = Object.values(frequency);

        setMainCategoryData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#233E8B', '#1EAE98', '#A9F1DF', '#FFFFC7'],
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  console.log(`현재는 ${currentMonth - 1}월입니다.`);

  return (
    <CRow>
      <CCol xs={12}>
        <h3>
          <strong>
            📊 지난 달 {currentMonth - 1}월 상품별 매출 현황 (매달 1일 자동
            갱신)
          </strong>
        </h3>
        <div>&nbsp;</div>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>대분류 별 판매량 건수 (용품 / 식품 / 의류 / 장난감)</strong>
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut data={mainCategoryData} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>매출 기준 순위 TOP10</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">순위</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품코드</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">월 판매량</CTableHeaderCell>
                  <CTableHeaderCell scope="col">월 매출</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {monthTop10Data.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell>{item.ranking}</CTableHeaderCell>
                    <CTableDataCell>{item.productId}</CTableDataCell>
                    <CTableDataCell>
                      <img
                        src={item.mainImgUrl}
                        alt={item.name}
                        width="50"
                        height="50"
                      />
                    </CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.salesVolume} (개)</CTableDataCell>
                    <CTableDataCell>
                      {item.salesAmount.toLocaleString()} ₩
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <h3>
          <strong>📊 장바구니 행동 통계</strong>
        </h3>
        <div>&nbsp;</div>
      </CCol>
    </CRow>
  );
}

export default Productstatistics;
// 진우 강쥐 다녀감
