import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import OrangeButton from "@/component/button/orange-button";
import RWDTitle from "@/component/layout/rwd-title";

import ListModel from "@/component/nosharable/list/list-model";
import ChooseModel from "@/component/nosharable/list/choose/choose-model";

import { unityOpenAction } from "@/redux/actions/publicAction";
import {
  readModelAction,
  deleteModelAction,
  SetDrawDataAction,
} from "@/redux/actions/ListAction";

import { deleteAlert } from "@/component/alert/alert";
import toast from "react-hot-toast";

import ReturnBlueButton from "@/component/button/return-blue-button";
import ReturnWhiteButton from "@/component/button/return-white-button";
import DeleteWhiteButton from "@/component/button/delete-white-button";

import LayoutMain from "@/component/layout/layout-main";
export default function ModelList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { current } = useSelector((state) => state.modelList);
  useEffect(() => {
    dispatch(readModelAction());
  }, []);

  const handleNext = () => {
    if (current.id) {
      dispatch(unityOpenAction());
      router.push("/draw");
    } else {
      toast.error("您未選擇模型");
    }
  };
  // delete item
  const [deleteItem, setDeleteItem] = useState([]);
  const handleChosenDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeleteItem((prev) => [...prev, Number(value)]);
    } else {
      setDeleteItem((prev) => prev.filter((item) => item !== Number(value)));
    }
  };
  const handleDeleteBTN = () => {
    deleteAlert().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteModelAction(deleteItem));
        setDeleteItem([]);
        dispatch(SetDrawDataAction({}));
      }
    });
  };

  return (
    <>
      <LayoutMain>
        <div className="bg-clouds"></div>
        <div className="bg-sky"></div>
        <div className="container">
          <RWDTitle title={datas.modellist} icon="icon-model-list" bgcolor="1">
            <DeleteWhiteButton handleDeleteBTN={handleDeleteBTN} />
            <button className="rwd-display-none-btn"></button>
          </RWDTitle>
          <div className="content content-pd content-blue-full">
            <ListModel
              handleChosenDelete={handleChosenDelete}
              handleDeleteBTN={handleDeleteBTN}
            />
            <ChooseModel>
              <OrangeButton
                text={datas.selectmodel}
                icon="icon-chooseModel"
                handleOrangeBTN={handleNext}
              />
            </ChooseModel>
            <div className="rwd-btn">
              <OrangeButton
                text={datas.selectmodel}
                icon="icon-chooseModel"
                handleOrangeBTN={handleNext}
              />
              <button className="rwd-display-none-btn"></button>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
