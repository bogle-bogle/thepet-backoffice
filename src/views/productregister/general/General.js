import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

function General() {
  return (
    <CCol xs={12}>
    <CCard className="mb-4">
      <CCardHeader>
        <strong>일반 상품 등록</strong>
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
                  대분류 *
                </CInputGroupText>
                <CFormSelect id="inputGroupSelect01">
                <option>식품 / 장난감 / 용품 / 의류</option>
                  <option value="FD">식품</option>
                  <option value="TO">장난감</option>
                  <option value="SP">용품</option>
                  <option value="FS">의류</option>
                </CFormSelect>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                  중분류
                </CInputGroupText>
                <CFormSelect id="inputGroupSelect01">
                  <option>선택</option>
                  <option value="FD">식품</option>
                  <option value="TO">장난감</option>
                  <option value="SP">용품</option>
                  <option value="FS">의류</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                  소분류
                </CInputGroupText>
                <CFormSelect id="inputGroupSelect01">
                  <option>선택</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
              </CInputGroup>
              <p>상품 이미지</p>
              <CInputGroup className="mb-3">
                <CFormInput type="file" id="inputGroupFile02" />
                <CInputGroupText component="label" htmlFor="inputGroupFile02">
                  Upload
                </CInputGroupText>
              </CInputGroup>
              <p>상세 이미지</p>
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

export default General;