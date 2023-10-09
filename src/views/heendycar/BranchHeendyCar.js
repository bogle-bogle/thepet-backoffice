import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModalFooter,
  CButton,
} from '@coreui/react';
import { format } from 'date-fns';
import * as Api from '../../api';

function BranchHeendyCar() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showEachBranchVisible, setShowEachBranchVisible] = useState(false);
  const [suppliesSearchResults, setSuppliesSearchResults] = useState([]);
  const [initialButtonStates, setInitialButtonStates] = useState({});

  useEffect(() => {
    Api.get(`/api/hc/branch`)
      .then((res) => {
        const transformedData = res.data.map((item) => ({
          branchCode: item.branchCode,
          name: item.name,
          cnt: item.cnt,
          imgUrl: item.imgUrl,
          descr: item.description,
        }));
        setSelectedProducts(transformedData);
      })

      .catch((Error) => {
        console.info('Error');
      });
  }, []);

  const openSuppliesSearchModal = (branchCode) => {
    Api.get(`/api/hc/branch/${branchCode}/reservation`)
      .then((res) => {
        setSuppliesSearchResults(res.data);
        setShowEachBranchVisible(true);
      })
      .catch((Error) => {
        console.info('Error');
      });
  };

  const closeSuppliesSearchModal = () => {
    setShowEachBranchVisible(false);
  };

  const handleToggle = (e, productId, newValue, idx) => {
    Api.put(
      `/api/hc/updateStatus/${productId}/${e.target.id}/${newValue}`
    ).then((res) => {
      if (res.status === 200) {
        setSuppliesSearchResults((prev) => {
          const newList = [...prev];
          newList[idx][e.target.id] = newValue;
          return newList;
        });
      }
    });
  };

  return (
    <>
      {showEachBranchVisible && (
        <CModal
          size="xl"
          alignment="center"
          scrollable
          visible={showEachBranchVisible}
          onClose={() => setShowEachBranchVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>예약 현황</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">회원 번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">유모차 번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">회원 이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col">전화 번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">예약 시간</CTableHeaderCell>
                  <CTableHeaderCell scope="col">픽업 여부</CTableHeaderCell>
                  <CTableHeaderCell scope="col">취소 여부</CTableHeaderCell>
                  <CTableHeaderCell scope="col">반납 여부</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {suppliesSearchResults.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4">
                      예약 정보가 없습니다.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  suppliesSearchResults.map((product, idx) => (
                    <CTableRow key={product.id}>
                      <CTableDataCell scope="row">
                        {product.memberId}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {product.serialNumber}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {product.name}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {product.phoneNumber ? product.phoneNumber : ''}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {format(
                          new Date(product.reservationTime),
                          'yyyy-MM-dd HH:mm:ss'
                        )}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        <span
                          style={{
                            marginLeft: '20px',
                            color: product.pickupYn === 'Y' ? 'green' : 'red', // 'Y'는 초록색, 'N'은 빨간색으로 설정
                          }}
                        >
                          {product.pickupYn}
                        </span>
                        <CButton
                          id="pickupYn"
                          style={{ marginLeft: '20px' }}
                          color="light"
                          onClick={(event) =>
                            handleToggle(
                              event,
                              product.id,
                              product.pickupYn === 'Y' ? 'N' : 'Y',
                              idx
                            )
                          }
                          disabled={
                            product.pickupYn === 'Y' || product.cancelYn === 'Y'
                          }
                        >
                          {product.pickupYn === 'Y' ? '완료' : '대기중'}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        <span
                          style={{
                            marginLeft: '20px',
                            color: product.cancelYn === 'Y' ? 'green' : 'red', // 'Y'는 초록색, 'N'은 빨간색으로 설정
                          }}
                        >
                          {product.cancelYn}
                        </span>
                        <CButton
                          id="cancelYn"
                          style={{ marginLeft: '20px' }}
                          color="light"
                          onClick={(event) =>
                            handleToggle(
                              event,
                              product.id,
                              product.cancelYn === 'Y' ? 'N' : 'Y',
                              idx
                            )
                          }
                          disabled={
                            product.returnYn === 'Y' || product.cancelYn === 'Y'
                          }
                        >
                          {product.cancelYn === 'Y' ? '완료' : '대기중'}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        <span
                          style={{
                            marginLeft: '20px',
                            color: product.returnYn === 'Y' ? 'green' : 'red', // 'Y'는 초록색, 'N'은 빨간색으로 설정
                          }}
                        >
                          {product.returnYn}
                        </span>
                        <CButton
                          id="returnYn"
                          style={{ marginLeft: '20px' }}
                          color="light"
                          onClick={(event) =>
                            handleToggle(
                              event,
                              product.id,
                              product.returnYn === 'Y' ? 'N' : 'Y',
                              idx
                            )
                          }
                          disabled={
                            product.returnYn === 'Y' || product.cancelYn === 'Y'
                          }
                        >
                          {product.returnYn === 'Y' ? '완료' : '대기중'}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
        </CModal>
      )}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>지점 별 예약 현황</strong>
          </CCardHeader>
          <CCardBody>
            <CRow xs={{ cols: 5 }} md={{ cols: 3 }} className="g-4">
              {selectedProducts.map((product, index) => (
                <CCol xs key={index}>
                  <CCard
                    className="h-100"
                    onClick={() => {
                      setShowEachBranchVisible(true);
                      openSuppliesSearchModal(product.branchCode);
                    }}
                  >
                    <CCardImage
                      orientation="top"
                      src={product.imgUrl || ''}
                      style={{ height: '265px' }}
                    />
                    <CCardBody>
                      <CCardTitle>{product.name || ''}</CCardTitle>
                      <CCardText>
                        잔여량 :{' '}
                        <span
                          className={
                            product.cnt >= 15
                              ? 'text-success'
                              : product.cnt >= 7
                              ? 'text-warning'
                              : 'text-danger'
                          }
                        >
                          {product.cnt ? product.cnt.toLocaleString() : ''}
                        </span>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
}

export default BranchHeendyCar;
