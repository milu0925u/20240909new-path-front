import React from "react";
import style from "../list.module.scss";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
export default function ChooseWorkCut({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.workList);

  return (
    <div className={style.chosen_list}>
      <div className={style.chosen_list_data}>
        {current ? (
          <>
            <div className={style.chosen_list_title}>
              <img alt="cut" src="/images/work/cut.svg" />
              <span>切割加工</span>
            </div>
            <h6>{datas.processingconfigurationname}</h6>
            <div className={style.chosen_list_name}>{current?.name}</div>
            <div>
              <div>{datas.cuttingprocessfrontandbackdepthadjustment}</div>
              <div>{datas.cuttingprocessspeedadjustment}</div>
            </div>
            <h6>{datas.processingequipment}</h6>
            <div className={style.chosen_list_content}>
              <div>
                {datas.cuttingequipment}：{current?.eq_name}
              </div>
              <div>
                {datas.roboticarm}：{current?.robot_name}
              </div>
              <div>
                {datas.visioncamera}：{current?.camera_name}
              </div>
              <div>
                {datas.safetyequipment}：{current?.security_name}
              </div>
              <div>
                {datas.airsupplyequipment}：{current?.gas_name}
              </div>
              <div>
                {datas.networkequipment}：{current?.network_name}
              </div>
            </div>
          </>
        ) : (
          <div className={style.empty_chosen}>{datas.emptychosen}</div>
        )}
      </div>
      <div className="nextbtn">
        <OrangeButton
          text={datas.executeprocessing}
          icon="icon-execute-work"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
    </div>
  );
}
