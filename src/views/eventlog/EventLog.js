import { CButtonGroup, CFormCheck } from "@coreui/react";
import React from "react";
import { useState } from "react";
import MainLog from "./MainLog";
import { useEffect } from "react";

import * as Api from "../../api";
import SuggestionLog from "./SuggestionLog";
import ProductCartRate from "./ProductCartRate";

function EventLog() {
  const [checkedButton, setCheckedButton] = useState("main");
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    Api.get(`/api/backoffice/event/main`).then((res) => {
      setStatistics(() => res.data);
    });
  }, []);

  const handleMemberCheckbox = (e) => {
    const { id } = e.target;
    console.log(id);
    setCheckedButton(() => id);

    Api.get(`/api/backoffice/event/${id}`).then((res) => {
      setStatistics(() => res.data);
      console.log(res);
    });
  };

  const createChart = () => {
    if (checkedButton === "main") {
      return <MainLog statistics={statistics}></MainLog>;
    } else if (checkedButton === "recommend") {
      return <SuggestionLog statistics={statistics}></SuggestionLog>;
    } else if (checkedButton === "shop") {
      return <ProductCartRate statistics={statistics}></ProductCartRate>;
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
          id="main"
          autoComplete="off"
          label="메인"
          defaultChecked={checkedButton === "main"}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="recommend"
          autoComplete="off"
          label="추천"
          defaultChecked={checkedButton === "recommend"}
          onClick={handleMemberCheckbox}
        />
        <CFormCheck
          type="radio"
          button={{ color: "primary", variant: "outline" }}
          name="member"
          id="shop"
          autoComplete="off"
          label="쇼핑"
          defaultChecked={checkedButton === "shop"}
          onClick={handleMemberCheckbox}
        />
      </CButtonGroup>
      {statistics !== undefined && createChart()}
    </>
  );
}

export default EventLog;
