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
} from "@coreui/react";
import axios from "axios";

function BranchHeendyCar() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ShowEachBranchVisible, setShowEachBranchVisible] = useState(false);
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

  const ShowEachBranch = () => {
    return (
      <>
        <CModal
          size="xl"
          alignment="center"
          scrollable
          visible={ShowEachBranchVisible}
          onClose={() => closeSuppliesSearchModal()}
          aria-labelledby="StaticBackdropExampleLabel"
        >
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
                    <CTableRow
                      key={product.id}
                      onClick={() => {
                        selectSupplies(item)
                      }}
                    >
                      <CTableHeaderCell scope="row">{product.memberId}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{product.reservationTime}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{product.createdAt}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{product.pickupYn}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{product.cancelYn}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{product.returnYn}</CTableHeaderCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
        </CModal>
      </>
    );
  };

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>지점 별 예약 현황</strong>
        </CCardHeader>
        <CCardBody>
          <CRow xs={{ cols: 5 }} md={{ cols: 3 }} className="g-4">
            {selectedProducts.map((product, index) => (
              <CCol xs key={index}>
                <CCard className="h-100" onClick={() => openSuppliesSearchModal(product.branchCode)}>
                  <CCardImage orientation="top" src={product.imgUrl || ""} style={{height:"265px"}} />
                  <CCardBody>
                    <CCardTitle>{product.name || ""}</CCardTitle>
                    <CCardText>
                      {product.cnt ? product.cnt.toLocaleString() : ""}
                    </CCardText>
                  </CCardBody>
                </CCard>
                {ShowEachBranch()}
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default BranchHeendyCar;
