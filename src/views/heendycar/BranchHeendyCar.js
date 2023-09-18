import React, { useState,useEffect } from "react";
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
} from "@coreui/react";
import axios from "axios";
import { format } from 'date-fns';

function BranchHeendyCar() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showEachBranchVisible, setShowEachBranchVisible] = useState(false);
  const [suppliesSearchResults, setSuppliesSearchResults] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:8080/api/hc/branch`)
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
          console.info("Error");
        });
    }, []);


  const openSuppliesSearchModal = (branchCode) => {
    axios
      .get(`http://localhost:8080/api/hc/branch/${branchCode}/reservation`)
      .then((res) => {
        setSuppliesSearchResults(res.data);
        setShowEachBranchVisible(true);
      })
      .catch((Error) => {
        console.info("Error");
      });
  };

  const closeSuppliesSearchModal = () => {
    setShowEachBranchVisible(false);
  };

  return (
    <>
    {showEachBranchVisible && <CModal size='xl' alignment="center" scrollable visible={showEachBranchVisible} onClose={() => setShowEachBranchVisible(false)}>
        <CModalHeader>
          <CModalTitle>예약 현황</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">회원 아이디</CTableHeaderCell>
                  <CTableHeaderCell scope="col">예약 시간</CTableHeaderCell>
                  <CTableHeaderCell scope="col">예약한 시간</CTableHeaderCell>
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
                  suppliesSearchResults.map((product) => (
                    <CTableRow>
                      <CTableDataCell scope="row">{product.memberId}</CTableDataCell>
                      <CTableDataCell scope="row">{format(new Date(product.reservationTime), 'yyyy-MM-dd HH:mm:ss')}</CTableDataCell>
                      <CTableDataCell scope="row">{format(new Date(product.createdAt), 'yyyy-MM-dd HH:mm:ss')}</CTableDataCell>
                      <CTableDataCell scope="row">{product.pickupYn}</CTableDataCell>
                      <CTableDataCell scope="row">{product.cancelYn}</CTableDataCell>
                      <CTableDataCell scope="row">{product.returnYn}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
        </CModalBody>
      </CModal>}
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>지점 별 예약 현황</strong>
        </CCardHeader>
        <CCardBody>
          <CRow xs={{ cols: 5 }} md={{ cols: 3 }} className="g-4">
            {selectedProducts.map((product, index) => (
              <CCol xs key={index}>
                <CCard className="h-100" onClick={() => {
                  setShowEachBranchVisible(true);
                  openSuppliesSearchModal(product.branchCode)
                  }}>
                  <CCardImage orientation="top" src={product.imgUrl || ""} style={{height:"265px"}} />
                  <CCardBody>
                    <CCardTitle>{product.name || ""}</CCardTitle>
                    <CCardText>
                      잔여량 : <span className={product.cnt >= 15 ? "text-success" : (product.cnt >= 7 ? "text-warning" : "text-danger")}>
                                {product.cnt ? product.cnt.toLocaleString() : ""}
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
