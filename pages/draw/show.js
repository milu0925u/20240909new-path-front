import React, { useState } from "react";
import { useUnityContext } from "react-unity-webgl";
import { useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import DrawShow from "@/component/nosharable/unity/show-unity";
export default function Show() {
  const { datas } = useSelector((state) => state.public);
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "/unity/ShowScene/Build/ShowScene_0801.loader.js",
    dataUrl: "/unity/ShowScene/Build/ShowScene_0801.data",
    frameworkUrl: "/unity/ShowScene/Build/ShowScene_0801.framework.js",
    codeUrl: "/unity/ShowScene/Build/ShowScene_0801.wasm",
  });

  // 開啟/關閉tool列表
  const [openTool, setOpenTool] = useState(true);
  // 選擇到的顏色
  const [chosen, setChosen] = useState("");
  // 設定路徑名稱
  const [pointName, setPointName] = useState("");

  /* ------------- 左邊 ------------- */
  const [openDraw, setOpenDraw] = useState(false);
  const [drawList, setDrawList] = useState([
    { id: 1, name: "路徑清單", img: "icon-path-list", ename: "list" },
    { id: 2, name: "刪除", img: "icon-delete", ename: "delete" },
    { id: 3, name: "展示", img: "icon-show", ename: "show" },
    { id: 4, name: "播放路徑", img: "icon-start", ename: "play" },
    { id: 5, name: "資訊", img: "icon-info", ename: "info" },
    { id: 6, name: "返回", img: "icon-return-back", ename: "back" },
  ]);
  const handleClickDraw = (e) => {
    const text = e.currentTarget.dataset.pen;
    setChosen(text);

    if (text === "list") {
      // 跳轉至路徑清單
    } else if (text === "delete") {
      // 刪除功能
    } else if (text === "show") {
      // 展示功能
    } else if (text === "play") {
      //播放路徑
    } else if (text === "info") {
      // 觸發資訊內容
    } else if (text === "back") {
      // 觸發返回上一頁
    }
  };

  // 滑鼠偵測
  const [mouse, setMouse] = useState("");
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setMouse("-left");
    } else if (e.button === 1) {
      setMouse("-center");
    } else if (e.button === 2) {
      setMouse("-right");
    }
  };
  const handleMouseUp = () => {
    setMouse("");
  };

  // 假設數據
  const coordinates = { lat: 20.1315, lon: 50.5615, jid: 50.1656 };
  const [point, setPoint] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ]);

  // 執行排列的展開
  const [open, setOpen] = useState(false);

  // 下一頁
  const handleNext = () => {
    const data = {
      name: pointName,
      data: point,
    };
  };

  return (
    <>
      <div className="bg-sky"></div>
      <div
        className="l_show_unity"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* 左側列表 */}
        <div className={`draw_tools ${!openTool ? "unity_unvisible" : ""}`}>
          {drawList.map((item, i) => (
            <div
              key={i}
              className={`${
                chosen === item.ename ? "chosen_pen" : ""
              } draw_list`}
              data-pen={item.ename}
              onClick={handleClickDraw}
            >
              <i className={item.img}></i>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        {/* 上方建立名稱 */}
        <div className={`naming ${!openTool ? "unity_unvisible" : ""}`}>
          <i className="icon-workname"></i>
          <input
            type="text"
            placeholder="路徑名稱"
            onChange={(e) => setPointName(e.target.value)}
          />
        </div>
        {/* 顯示unity畫面 */}
        <div className="unity_screen">
          <DrawShow
            unityProvider={unityProvider}
            addEventListener={addEventListener}
            removeEventListener={removeEventListener}
            sendMessage={sendMessage}
            requestFullscreen={requestFullscreen}
          />
        </div>
        {/* 儲存按鈕 */}
        <div
          className={`save_btn tool_save_btn ${
            !openTool ? "unity_unvisible" : ""
          }`}
        >
          <OrangeButton
            text={datas.save}
            icon="icon-save"
            handleOrangeBTN={handleNext}
          />
        </div>
        {/* 執行順序 */}
        <div
          className={`tool_execution ${!openTool ? "unity_unvisible" : ""} ${
            !open ? "open_execution_expand" : ""
          }`}
        >
          <h1>執行順序</h1>
          <div className="show-array">
            <div>
              <div className="show-array-title">
                <button>
                  <i className="icon-pen"></i>
                  <span className="count">{point ? point.length : 0}</span>
                </button>
              </div>
              <div className="show-array-content">
                {point.map((v) => (
                  <div>
                    <p>{v.id}.</p>
                    <button>
                      <i className="icon-pen"></i>
                    </button>
                    <span className="display-point">{`(${coordinates.lat}, ${coordinates.lon},${coordinates.jid})`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="execute-bar"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <i className={` icon-bar ${open ? "scaleXlIE" : "scaleXlDE"}`}>
              <i className="path1"></i>
              <i className="path2"></i>
              <i className="path3"></i>
            </i>
          </button>
        </div>
        {/* 滑鼠顯示 */}
        <button className={`mouse ${!openTool ? "unity_unvisible" : ""}`}>
          <img alt="mouse" src={`/images/unity/mouse${mouse}.svg`} />
        </button>
      </div>
    </>
  );
}
