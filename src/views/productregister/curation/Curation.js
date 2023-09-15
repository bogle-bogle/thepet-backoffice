import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCardTitle,
  CCardImage,
  CCardText,
  CWidgetStatsF,
} from "@coreui/react";
import { SearchContainer, SearchImg } from "./Curation.style";
import axios from "axios";

function Curation() {
  const categoryCodes = {
    food: "FD",
    toy: "TO",
    supplies: "SP",
  };
  const [foodSearchVisible, setFoodSearchVisible] = useState(false);
  const [toySearchVisible, setToySearchVisible] = useState(false);
  const [suppliesSearchVisible, setSuppliesSearchVisible] = useState(false);

  const [foodSearchKeyword, setFoodSearchKeyword] = useState("");
  const [toySearchKeyword, setToySearchKeyword] = useState("");
  const [suppliesSearchKeyword, setSuppliesSearchKeyword] = useState("");

  const [foodSearchResults, setFoodSearchResults] = useState([]);
  const [toySearchResults, setToySearchResults] = useState([]);
  const [suppliesSearchResults, setsuppliesSearchResults] = useState([]);

  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedToy, setSelectedToy] = useState(null);
  const [selectedSupplies, setSelectedSupplies] = useState(null);

  const [searchProductList, setSearchProductList] = useState([]);
  const fetchProductData = (category, keyword, setSearchProductList) => {
    axios
      .get(
        `http://api.thepet.thehyundai.site:8080/api/product/search?main-category=${category}&keyword=${keyword}`
      )
      .then((res) => {
        if (res.data) {
          setSearchProductList(res.data);
          console.log(res.data);
        }
      })
      .catch((error) => {
        setSearchProductList([]);
        console.error("데이터가 없음", error);
      });
  };

  const FoodSearchModal = () => {
    return (
      <>
        <CModal
          alignment="center"
          scrollable
          visible={foodSearchVisible}
          onClose={() => setFoodSearchVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>식품 구성 선택하기</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">상품코드</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품</CTableHeaderCell>
                  <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                  <CTableHeaderCell scope="col">가격</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {foodSearchResults.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4">
                      검색된 상품이 없습니다
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  foodSearchResults.map((product) => (
                    <CTableRow
                      key={product.id}
                      onClick={() => {
                        setFoodSearchVisible(false);
                        setSelectedFood(product);
                      }}
                    >
                      <CTableHeaderCell scope="row">
                        {product.id}
                      </CTableHeaderCell>
                      <CTableDataCell>
                        <SearchImg src={`${product.mainImgUrl}`} />
                      </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      <CTableDataCell>{product.price}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setFoodSearchVisible(false)}
            >
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  const ToySearchModal = () => {
    return (
      <>
        <CModal
          alignment="center"
          scrollable
          visible={toySearchVisible}
          onClose={() => setToySearchVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>장난감 구성 선택하기</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">상품코드</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품</CTableHeaderCell>
                  <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                  <CTableHeaderCell scope="col">가격</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {toySearchResults.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4">
                      검색된 상품이 없습니다
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  toySearchResults.map((product) => (
                    <CTableRow
                      key={product.id}
                      onClick={() => {
                        setToySearchVisible(false);
                        setSelectedToy(product);
                      }}
                    >
                      <CTableHeaderCell scope="row">
                        {product.id}
                      </CTableHeaderCell>
                      <CTableDataCell>
                        <SearchImg src={`${product.mainImgUrl}`} />
                      </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      <CTableDataCell>{product.price}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setToySearchVisible(false)}
            >
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  const SuppliesSearchModal = () => {
    return (
      <>
        <CModal
          alignment="center"
          scrollable
          visible={suppliesSearchVisible}
          onClose={() => setSuppliesSearchVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>용품 구성 선택하기</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">상품코드</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상품</CTableHeaderCell>
                  <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                  <CTableHeaderCell scope="col">가격</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {suppliesSearchResults.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4">
                      검색된 상품이 없습니다
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  suppliesSearchResults.map((product) => (
                    <CTableRow
                      key={product.id}
                      onClick={() => {
                        setSuppliesSearchVisible(false);
                        setSelectedSupplies(product);
                      }}
                    >
                      <CTableHeaderCell scope="row">
                        {product.id}
                      </CTableHeaderCell>
                      <CTableDataCell>
                        <SearchImg src={`${product.mainImgUrl}`} />
                      </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      <CTableDataCell>{product.price}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setSuppliesSearchVisible(false)}
            >
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>월간구독 상품 등록</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">상품명 *</CInputGroupText>
            <CFormInput
              placeholder="100자 이내"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>상품 가격 *</CInputGroupText>
            <CFormInput aria-label="Amount (to the nearest dollar)" />
            <CInputGroupText> ₩ </CInputGroupText>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText component="label" htmlFor="inputGroupSelect01">
              월 선택
            </CInputGroupText>
            <CFormSelect id="inputGroupSelect01">
              <option>선택</option>
              <option>1월</option>
              <option>2월</option>
              <option>3월</option>
              <option>4월</option>
              <option>5월</option>
              <option>6월</option>
              <option>7월</option>
              <option>8월</option>
              <option>9월</option>
              <option>10월</option>
              <option>11월</option>
              <option>12월</option>
            </CFormSelect>
          </CInputGroup>
          <SearchContainer>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="식품 검색어를 입력하세요."
                value={foodSearchKeyword}
                onChange={(e) => {
                  setFoodSearchKeyword(e.target.value);
                }}
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              {FoodSearchModal()}
              <CButton
                onClick={() => {
                  fetchProductData(
                    categoryCodes.food,
                    foodSearchKeyword,
                    setFoodSearchResults
                  );
                  setFoodSearchVisible(!foodSearchVisible);
                }}
                type="button"
                color="secondary"
                variant="outline"
                id="button-addon2"
              >
                식품 검색
              </CButton>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="장난감 검색어를 입력하세요."
                value={toySearchKeyword}
                onChange={(e) => {
                  setToySearchKeyword(e.target.value);
                }}
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              {ToySearchModal()}
              <CButton
                onClick={() => {
                  fetchProductData(
                    categoryCodes.toy,
                    toySearchKeyword,
                    setToySearchResults
                  );
                  setToySearchVisible(!toySearchVisible);
                }}
                type="button"
                color="secondary"
                variant="outline"
                id="button-addon2"
              >
                장난감 검색
              </CButton>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="용품 검색어를 입력하세요."
                value={suppliesSearchKeyword}
                onChange={(e) => {
                  setSuppliesSearchKeyword(e.target.value);
                }}
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              {SuppliesSearchModal()}
              <CButton
                onClick={() => {
                  fetchProductData(
                    categoryCodes.supplies,
                    suppliesSearchKeyword,
                    setsuppliesSearchResults
                  );
                  setSuppliesSearchVisible(!suppliesSearchVisible);
                }}
                type="button"
                color="secondary"
                variant="outline"
                id="button-addon2"
              >
                용품 검색
              </CButton>
            </CInputGroup>
          </SearchContainer>
          <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={selectedFood ? selectedFood.mainImgUrl : "data:image/png;base64,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"}
                />
                <CCardBody>
                  <CCardTitle>{selectedFood ? selectedFood.name : ""}</CCardTitle>
                  <CCardText>{selectedFood ? selectedFood.price.toLocaleString() : ""}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={selectedToy ? selectedToy.mainImgUrl : "data:image/png;base64,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"}
                />
                <CCardBody>
                  <CCardTitle>{selectedToy ? selectedToy.name : ""}</CCardTitle>
                  <CCardText>{selectedToy ? selectedToy.price.toLocaleString() : ""}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={selectedSupplies ? selectedSupplies.mainImgUrl : "data:image/png;base64,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"}
                />
                <CCardBody>
                <CCardTitle>{selectedSupplies ? selectedSupplies.name : ""}</CCardTitle>
                  <CCardText>{selectedSupplies ? selectedSupplies.price.toLocaleString() : ""}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CInputGroup>
            <CFormInput
              type="file"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
            <CButton
              type="button"
              color="secondary"
              variant="outline"
              id="inputGroupFileAddon04"
            >
              * OCR로 성분 추출
            </CButton>
          </CInputGroup>
          <p>상세</p>
          <CInputGroup>
            <CInputGroupText>With textarea</CInputGroupText>
            <CFormTextarea aria-label="With textarea"></CFormTextarea>
          </CInputGroup>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default Curation;
