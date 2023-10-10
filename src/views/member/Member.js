import {
  CButtonGroup,
  CCol,
  CContainer,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
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
import * as Api from '../../api';
import DatePicker from 'react-datepicker';
import './custom-member.css';
import { CustomDatePicker } from '../productregister/curation/Curation.style';

function Member() {
  const [members, setMembers] = useState([]);
  const [checkedButton, setCheckedButton] = useState('entire');
  const [total, setTotal] = useState(0);
  const [totalMember, setTotalMember] = useState(0);
  const [cur, setCur] = useState(1);
  const [startDate, setStartDate] = useState(new Date('2023-9-1'));
  const [endDate, setEndDate] = useState(new Date('2023-9-30'));

  // useEffect(() => {
  //   Api.get(`/api/backoffice/member/${checkedButton}?page=${cur}`).then(
  //     (res) => {
  //       setMembers([...res.data.members]);
  //       setTotalMember(res.data.count);
  //       setTotal(() => {
  //         const temp = res.data.count;

  //         let totalPage = Math.floor(temp / 20);

  //         if (temp % 20 > 0) {
  //           totalPage += 1;
  //         }

  //         return totalPage;
  //       });
  //     }
  //   );
  // }, [cur, checkedButton]);

  useEffect(() => {
    const data = {
      page: (cur - 1) * 20 + 1,
      startDate:
        startDate === null
          ? null
          : `${startDate.getFullYear()}/${
              startDate.getMonth() + 1
            }/${startDate.getDate()}`,
      endDate:
        endDate === null
          ? null
          : `${endDate.getFullYear()}/${
              endDate.getMonth() + 1
            }/${endDate.getDate()}`,
    };

    Api.post(`/api/backoffice/member/${checkedButton}`, {
      page: (cur - 1) * 20 + 1,
      startDate:
        startDate === null
          ? null
          : `${startDate.getFullYear()}/${
              startDate.getMonth() + 1
            }/${startDate.getDate()}`,
      endDate:
        endDate === null
          ? null
          : `${endDate.getFullYear()}/${
              endDate.getMonth() + 1
            }/${endDate.getDate()}`,
    }).then((res) => {
      setMembers([...res.data.members]);
      console.log(res.data);
      setTotalMember(res.data.count);
      setTotal(() => {
        const temp = res.data.count;

        let totalPage = Math.floor(temp / 20);

        if (temp % 20 > 0) {
          totalPage += 1;
        }

        return totalPage;
      });
    });
  }, [cur, checkedButton, startDate, endDate]);

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
              <CTableHeaderCell scope="col">핸드폰번호</CTableHeaderCell>
              <CTableHeaderCell scope="col">상품</CTableHeaderCell>
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
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
                <CTableDataCell>{member.productId}</CTableDataCell>
                <CTableDataCell>{member.startDate}</CTableDataCell>
                <CTableDataCell>
                  {member.endDate !== null ? member.endDate : '~'}
                </CTableDataCell>
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
          <CCol md="auto">
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
                label="반려동물 등록 고객"
                defaultChecked={checkedButton === 'heendy'}
                onClick={handleMemberCheckbox}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="subscribe"
                autoComplete="off"
                label="더펫 박스 구독"
                defaultChecked={checkedButton === 'subscribe'}
                onClick={handleMemberCheckbox}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant: 'outline' }}
                name="member"
                id="delivery"
                autoComplete="off"
                label="상품 정기배송"
                defaultChecked={checkedButton === 'delivery'}
                onClick={handleMemberCheckbox}
              />
            </CButtonGroup>
          </CCol>

          <CCol md="auto">
            <CInputGroup className="mb-3">
              <CustomDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </CInputGroup>
          </CCol>
          <CCol
            md="auto"
            style={{ padding: 0, fontWeight: 'bold', fontSize: '20px' }}
          >
            ~
          </CCol>
          <CCol md="auto">
            <CInputGroup className="mb-3">
              <CustomDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </CInputGroup>
          </CCol>

          <CCol md="auto">
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                style={{ color: 'black' }}
              >{`${totalMember.toLocaleString()}명`}</CPaginationItem>
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
