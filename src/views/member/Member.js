import {
  CButton,
  CButtonGroup,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { DocsExample } from "src/components";

import * as Api from "../../api";

function Member() {
  const [members, setMembers] = useState([]);
  const [checkedButton, setCheckedButton] = useState("entire");

  useEffect(() => {
    Api.get("/api/member/entire").then((res) => setMembers([...res.data]));
  }, []);

  const handleMemberCheckbox = (e) => {
    const { id } = e.target;
    setCheckedButton(() => id);
    Api.get(`/api/member/${id}`).then((res) => setMembers([...res.data]));
  };

  const createTable = (selected) => {
    console.log(selected);
    console.log(members);
    if (selected === "entire" || selected === "heendy") {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">닉네임</CTableHeaderCell>
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
                <CTableDataCell>{member.nickname}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    } else if (selected === "subscribe") {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">닉네임</CTableHeaderCell>
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
                <CTableDataCell>{member.nickname}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
                <CTableDataCell>{member.startDate}</CTableDataCell>
                <CTableDataCell>
                  {member.endDate !== null ? member.endDate : "~"}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    } else if (selected === "delivery") {
      return (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">이름</CTableHeaderCell>
              <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
              <CTableHeaderCell scope="col">닉네임</CTableHeaderCell>
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
                <CTableDataCell>{member.nickname}</CTableDataCell>
                <CTableDataCell>{member.clubHeendyYn}</CTableDataCell>
                <CTableDataCell>{member.phoneNumber}</CTableDataCell>
                <CTableDataCell>{member.startDate}</CTableDataCell>
                <CTableDataCell>
                  {member.endDate !== null ? member.endDate : "~"}
                </CTableDataCell>
                <CTableDataCell>{member.productId}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
    }
  };

  return (
    <>
      <CButtonGroup
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="entire"
          autoComplete="off"
          label="전체"
          defaultChecked={checkedButton === "entire"}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="heendy"
          autoComplete="off"
          label="흰디클럽"
          defaultChecked={checkedButton === "heendy"}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="subscribe"
          autoComplete="off"
          label="구독"
          defaultChecked={checkedButton === "subscribe"}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="delivery"
          autoComplete="off"
          label="정기배송"
          defaultChecked={checkedButton === "delivery"}
          onClick={handleMemberCheckbox}
        />
      </CButtonGroup>
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
