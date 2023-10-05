import {
  CButtonGroup,
  CCol,
  CContainer,
  CFormCheck,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { DocsExample } from 'src/components';

import * as Api from '../../api';

import './custom-member.css';

function Member() {
  const [members, setMembers] = useState([]);
  const [checkedButton, setCheckedButton] = useState('entire');
  const [total, setTotal] = useState(0);
  const [cur, setCur] = useState(1);

  useEffect(() => {
    Api.get(`/api/backoffice/member/${checkedButton}?page=${cur}`).then(
      (res) => {
        setMembers([...res.data.members]);
        setTotal(() => {
          const temp = res.data.count;

          let totalPage = Math.floor(temp / 20);

          if (temp % 20 > 0) {
            totalPage += 1;
          }

          return totalPage;
        });
      }
    );
  }, [cur, checkedButton]);

  const handleMemberCheckbox = (e) => {
    const { id } = e.target;
    setCheckedButton(() => id);
    setCur(1);
  };

  const pageIncrease = () => {
    if (cur === total) return;
    setCur((prev) => prev + 1);
  };

  const pageDecrease = () => {
    if (cur === 1) return;
    setCur((prev) => prev - 1);
  };

  const createTable = (selected) => {
    if (selected === 'entire' || selected === 'heendy') {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                흰디클럽 가입 여부
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">핸드폰번호</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {members.map((member) => (
              <CTableRow>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.name}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    } else if (selected === 'subscribe') {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                흰디클럽 가입 여부
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">핸드폰번호</CTableHeaderCell>
              <CTableHeaderCell scope="col">시작 날짜</CTableHeaderCell>
              <CTableHeaderCell scope="col">종료 날짜</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {members.map((member) => (
              <CTableRow>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.name}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
                <CTableDataCell>{member.startDate}</CTableDataCell>
                <CTableDataCell>
                  {member.endDate !== null ? member.endDate : '~'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    } else if (selected === 'delivery') {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                흰디클럽 가입 여부
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">핸드폰번호</CTableHeaderCell>
              <CTableHeaderCell scope="col">시작 날짜</CTableHeaderCell>
              <CTableHeaderCell scope="col">종료 날짜</CTableHeaderCell>
              <CTableHeaderCell scope="col">상품</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {members.map((member) => (
              <CTableRow>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.name}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
                <CTableDataCell>{member.startDate}</CTableDataCell>
                <CTableDataCell>
                  {member.endDate !== null ? member.endDate : '~'}
                </CTableDataCell>
                <CTableDataCell>{member.productId}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    }
  };

  const createPagenation = () => {
    return (
      <CPaginationItem
        style={{ color: '#376558' }}
      >{`${cur}/${total}`}</CPaginationItem>
    );
  };

  return (
    <>
      <CContainer>
        <CRow>
          <CCol>
            <CButtonGroup
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="entire"
                autoComplete="off"
                label="전체"
                defaultChecked={checkedButton === 'entire'}
                onClick={handleMemberCheckbox}
                style={{ color: 'black' }}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="heendy"
                autoComplete="off"
                label="흰디클럽"
                defaultChecked={checkedButton === 'heendy'}
                onClick={handleMemberCheckbox}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="subscribe"
                autoComplete="off"
                label="구독"
                defaultChecked={checkedButton === 'subscribe'}
                onClick={handleMemberCheckbox}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="delivery"
                autoComplete="off"
                label="정기배송"
                defaultChecked={checkedButton === 'delivery'}
                onClick={handleMemberCheckbox}
              />
            </CButtonGroup>
          </CCol>
          <CCol style={{ display: 'flex', justifyContent: 'end' }}>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                onClick={pageDecrease}
                style={{ cursor: 'pointer', color: '#376558' }}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {createPagenation()}
              <CPaginationItem
                aria-label="Next"
                onClick={pageIncrease}
                style={{ cursor: 'pointer', color: '#376558' }}
              >
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </CCol>
        </CRow>
      </CContainer>
      {members !== undefined && members !== null && createTable(checkedButton)}
      {/* <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">이름</CTableHeaderCell>
            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
            <CTableHeaderCell scope="col">닉네임</CTableHeaderCell>
            <CTableHeaderCell scope="col">흰디클럽 가입 여부</CTableHeaderCell>
            <CTableHeaderCell scope="col">핸드폰번호</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {members !== undefined &&
            members !== null &&
            members.map((member) => (
              <CTableRow>
                <CTableHeaderCell scope="row">{member.id}</CTableHeaderCell>
                <CTableDataCell>{member.name}</CTableDataCell>
                <CTableDataCell>{member.email}</CTableDataCell>
                <CTableDataCell>{member.nickname}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable> */}
    </>
  );
}

export default Member;
