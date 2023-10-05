import React, { useState, useEffect } from 'react';
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
} from '@coreui/react';
import { SearchContainer, SearchImg, CustomDatePicker } from './Curation.style';
import * as Api from '../../../api';
import DogFoodURL from '../../../assets/images/dog-food.png';
import DogToyURL from '../../../assets/images/dog-toy.png';
import DogFsURL from '../../../assets/images/dog-fs.png';
import { ko } from 'date-fns/esm/locale';

function Curation() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [thumbnailImgUrl, setThumbnailImgUrl] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedToy, setSelectedToy] = useState(null);
  const [selectedSupplies, setSelectedSupplies] = useState(null);

  const categoryCodes = {
    food: 'FD',
    toy: 'TO',
    fashion: 'FS',
  };

  const [foodSearchVisible, setFoodSearchVisible] = useState(false);
  const [toySearchVisible, setToySearchVisible] = useState(false);
  const [suppliesSearchVisible, setSuppliesSearchVisible] = useState(false);

  const [foodSearchKeyword, setFoodSearchKeyword] = useState('');
  const [toySearchKeyword, setToySearchKeyword] = useState('');
  const [suppliesSearchKeyword, setSuppliesSearchKeyword] = useState('');

  const [foodSearchResults, setFoodSearchResults] = useState([]);
  const [toySearchResults, setToySearchResults] = useState([]);
  const [suppliesSearchResults, setsuppliesSearchResults] = useState([]);

  const handleDatepicker = () => {};

  const uploadImageToS3 = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await Api.post(`/api/upload/admin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  const handleImageUpload = async (e) => {
    const ImgFile = e.target.files[0];
    const imgUrl = await uploadImageToS3(ImgFile);
    setImgUrl(imgUrl);
  };

  const handleThumbnailImageUpload = async (e) => {
    const thumbnailImgFile = e.target.files[0];
    const imgUrl = await uploadImageToS3(thumbnailImgFile);
    setThumbnailImgUrl(imgUrl);
  };

  const [searchProductList, setSearchProductList] = useState([]);
  const fetchProductData = async (category, keyword, setSearchProductList) => {
    await Api.get(
      `/api/product/search?main-category=${category}&keyword=${keyword}`
    )
      .then((res) => {
        if (res.data) {
          setSearchProductList(res.data);
          console.log(res.data);
        }
      })
      .catch((error) => {
        setSearchProductList([]);
        console.error('데이터가 없음', error);
      });
  };

  const resgisterCurationProduct = () => {
    const curationData = {
      name: name,
      price: price,
      imgUrl: imgUrl,
      thumbnailImgUrl: thumbnailImgUrl,
      paymentDate: paymentDate,
      product1Id: selectedFood.id,
      product2Id: selectedToy.id,
      product3Id: selectedSupplies.id,
    };
    console.log(curationData);
    Api.post(`/api/curation`, curationData).then((res) => {
      console.log(res.data);
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
                      <CTableDataCell>
                        {product.price.toLocaleString()}원
                      </CTableDataCell>
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
                      <CTableDataCell>
                        {product.price.toLocaleString()}원
                      </CTableDataCell>
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
            <CModalTitle>의류 구성 선택하기</CModalTitle>
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
                      <CTableDataCell>
                        {product.price.toLocaleString()}원
                      </CTableDataCell>
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
            <CInputGroupText id="basic-addon1">구독 상품명 *</CInputGroupText>
            <CFormInput
              placeholder="100자 이내"
              onChange={(e) => setName(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>결제일 지정 *</CInputGroupText>
            <CustomDatePicker
              dateFormat="yy/MM/dd"
              onChange={(date) => setPaymentDate(date)}
              selected={paymentDate}
              locale={ko}
              minDate={new Date()}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>구독 상품 가격 *</CInputGroupText>
            <CFormInput
              aria-label="Amount (to the nearest dollar)"
              onChange={(e) => setPrice(e.target.value)}
            />
            <CInputGroupText> ₩ </CInputGroupText>
          </CInputGroup>
          <CFormLabel>구독 상품 대표 이미지 *</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" onChange={handleThumbnailImageUpload} />
          </CInputGroup>
          <CFormLabel>구독 상품 상세 이미지 *</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" onChange={handleImageUpload} />
          </CInputGroup>
          <CFormLabel>구성 상품 정하기 (식품 / 장난감 / 의류) *</CFormLabel>
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
                placeholder="의류 검색어를 입력하세요."
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
                    categoryCodes.fashion,
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
                의류 검색
              </CButton>
            </CInputGroup>
          </SearchContainer>
          <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={
                    selectedFood
                      ? selectedFood.mainImgUrl
                      : DogFoodURL
                  }
                />
                <CCardBody>
                  <CCardTitle>
                    {selectedFood ? selectedFood.name : ''}
                  </CCardTitle>
                  <CCardText>
                    {selectedFood ? selectedFood.price.toLocaleString() : ''}
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={
                    selectedToy
                      ? selectedToy.mainImgUrl
                      : DogToyURL
                    }
                />
                <CCardBody>
                  <CCardTitle>{selectedToy ? selectedToy.name : ''}</CCardTitle>
                  <CCardText>
                    {selectedToy ? selectedToy.price.toLocaleString() : ''}
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs>
              <CCard className="h-100">
                <CCardImage
                  orientation="top"
                  src={
                    selectedSupplies
                      ? selectedSupplies.mainImgUrl
                      : DogFsURL
                    }
                />
                <CCardBody>
                  <CCardTitle>
                    {selectedSupplies ? selectedSupplies.name : ''}
                  </CCardTitle>
                  <CCardText>
                    {selectedSupplies
                      ? selectedSupplies.price.toLocaleString()
                      : ''}
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <div className="d-grid gap-2 col-6 mx-auto">
        <CButton
          classtype="submit"
          color="success"
          onClick={resgisterCurationProduct}
        >
          구독 상품 등록하기
        </CButton>
      </div>
    </CCol>
  );
}

export default Curation;
