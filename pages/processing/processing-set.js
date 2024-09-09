import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import RWDTitle from "@/component/layout/rwd-title";

import { SaveSetWorkingAction } from "@/redux/actions/ListAction";
import LeftcontentParam from "@/component/nosharable//info/eq-left-info";
import OrangeButton from "@/component/button/orange-button";
import LayoutMain from "@/component/layout/layout-main";
import toast from "react-hot-toast";
import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";

import ParamSettingWeld from "@/component/nosharable/setting/workway/param-setting-weld";

export default function ProcessingSet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { create } = useSelector((state) => state.workList);
  const { datas } = useSelector((state) => state.public);

  // 確認此頁的加工方式
  const renderCurrentScreen = () => {
    if (create.way === "weld") {
      return <ParamSettingWeld handleSave={handleSave} />;
    }
    // 需要加更多加工方式頁面
  };

  // page
  const handleReturn = () => {
    router.push("/processing/processing-chose");
  };
  const handleSave = async () => {
    const error = checkHasError();
    if (!error) {
      dispatch(SaveSetWorkingAction(create)); //儲存設定
      router.push("/processing/processing-list");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };
  // check input
  const checkHasError = () => {
    if (!create?.deep) {
      toast.error("請填入深度");
      return true;
    } else if (!create?.electric_current) {
      toast.error("請填入電流");
      return true;
    } else if (!create?.voltage) {
      toast.error("請填入電壓");
      return true;
    } else if (!create?.name) {
      toast.error("請填入加工設定名稱");
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="bg-execute"></div>
      <div className="container">
        <RWDTitle
          title={datas.processingsetting}
          icon="icon-armparametersettings"
        >
          <ReturnWhiteButton handleReturnBTN={handleReturn} />
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <LeftcontentParam />
          {renderCurrentScreen()}
          <div className="rwd-btn">
            <OrangeButton
              text={datas.save}
              icon="icon-save"
              handleOrangeBTN={handleSave}
            />
            <ReturnBlueButton handleReturnBTN={handleReturn} />
          </div>
        </div>
      </div>
    </>
  );
}
