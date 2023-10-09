import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import {
  productMain,
  productSub,
  proteinCode,
  animalCode,
} from 'src/commonCode.js';
import * as Api from '../../../api';
import axios from 'axios';

function General() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [animalCategory, setAnimalCategory] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [mainImgFile, setMainImgFile] = useState('');
  const [descImgFile, setDescImgFile] = useState('');
  const [foodDescImgFile, setFoodDescImgFile] = useState('');
  const [ocrResult, setOCRResult] = useState('');

  const handleAnimalCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setAnimalCategory(selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory('');
    setSubSubCategory('');
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategory(selectedSubCategory);
    setSubSubCategory('');
  };

  const handleSubSubCategoryChange = (e) => {
    const selectedSubSubCategory = e.target.value;
    setSubSubCategory(selectedSubSubCategory);
  };

  const handleMainImageUpload = async (e) => {
    const mainImgFile = e.target.files[0];
    const imgUrl = await uploadImageToS3(mainImgFile);
    setMainImgFile(imgUrl);
  };

  const handleDescImageUpload = async (e) => {
    const descImgFile = e.target.files[0];
    const imgUrl = await uploadImageToS3(descImgFile);
    setDescImgFile(imgUrl);
  };

  const handleFoodDescImageUpload = async (e) => {
    const descImgFile = e.target.files[0];
    const imgUrl = await uploadImageToS3(descImgFile);
    setFoodDescImgFile(imgUrl);
  };

  const handleOcrBtn = async () => {
    if (!foodDescImgFile) {
      alert('성분 이미지 파일을 선택해주세요.');
      return;
    }

    await axios
      .post(`https://ocr-nlp.thepet.thehyundai.site/ai/ocr`, {
        imgUrl: foodDescImgFile,
      })
      .then((res) => {
        if (res.data) {
          setOCRResult(res.data);
        }
      });
  };

  const uploadImageToS3 = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await Api.post(`/api/upload/admin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).catch((error) => {
      console.log(error);
    });
    return response.data;
  };

  const resgisterGeneralProduct = () => {
    const productData = {
      name: name,
      price: price,
      mainImgUrl: mainImgFile,
      descImgUrl: descImgFile,
      ingredients: ocrResult,
      mainCategoryCode: category,
      subCategoryCode: subCategory,
      animalTypeCode: animalCategory,
      proteinCode: subSubCategory,
    };
    axios.post('/api/product/general', productData).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>일반 상품 등록</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="mb-3">
            <CInputGroupText>상품명 *</CInputGroupText>
            <CFormInput
              placeholder="100자 이내"
              onChange={(e) => setName(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>상품 가격 *</CInputGroupText>
            <CFormInput
              placeholder="1,000원 이상 입력"
              onChange={(e) => setPrice(e.target.value)}
            />
            <CInputGroupText> ₩ </CInputGroupText>
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>종류 *</CInputGroupText>
            <CFormSelect
              onChange={handleAnimalCategoryChange}
              value={animalCategory}
            >
              <option value="">선택</option>
              {Object.entries(animalCode).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>대분류 *</CInputGroupText>
            <CFormSelect onChange={handleCategoryChange} value={category}>
              <option value="">선택</option>
              {Object.entries(productMain).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>

          <CInputGroup className="mb-3">
            <CInputGroupText>중분류</CInputGroupText>
            <CFormSelect onChange={handleSubCategoryChange} value={subCategory}>
              {category &&
                Object.entries(productSub[category] || {}).map(
                  ([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  )
                )}
            </CFormSelect>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>소분류</CInputGroupText>
            <CFormSelect
              onChange={handleSubSubCategoryChange}
              value={subSubCategory}
            >
              {category == 'FD' &&
                Object.entries(proteinCode).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
            </CFormSelect>
          </CInputGroup>
          <CFormLabel>상품 메인 이미지 *</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" onChange={handleMainImageUpload} />
          </CInputGroup>
          {mainImgFile !== '' && (
            <>
              <CImage
                rounded
                thumbnail
                src={mainImgFile}
                width={200}
                height={200}
              />
              <br />
            </>
          )}

          <CFormLabel>상품 상세 이미지 *</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" onChange={handleDescImageUpload} />
          </CInputGroup>
          {descImgFile !== '' && (
            <>
              <CImage
                rounded
                thumbnail
                src={descImgFile}
                width={200}
                height={200}
              />
              <br />
            </>
          )}

          <CFormLabel>(식품) 사료 성분 이미지</CFormLabel>
          <CInputGroup>
            <CFormInput type="file" onChange={handleFoodDescImageUpload} />
            <CButton
              type="button"
              onClick={handleOcrBtn}
              color="secondary"
              variant="outline"
              id="inputGroupFileAddon04"
            >
              * OCR로 성분 추출
            </CButton>
          </CInputGroup>
          {foodDescImgFile !== '' && (
            <>
              <CImage
                rounded
                thumbnail
                src={foodDescImgFile}
                width={400}
                height={400}
              />
              <br />
            </>
          )}
          <CFormLabel></CFormLabel>
          <CInputGroup>
            <CInputGroupText>식품 OCR 추출 결과</CInputGroupText>
            <CFormTextarea
              value={ocrResult}
              onChange={(e) => setOCRResult(e.target.value)}
              style={{ resize: 'none', height: '170px' }}
            >
              {ocrResult}
            </CFormTextarea>
          </CInputGroup>
        </CCardBody>
      </CCard>
      <div className="d-grid gap-2 col-6 mx-auto">
        <CButton
          classtype="submit"
          color="success"
          onClick={resgisterGeneralProduct}
        >
          일반 상품 등록하기
        </CButton>
      </div>
    </CCol>
  );
}

export default General;
