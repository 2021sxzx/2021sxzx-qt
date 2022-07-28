import style from "./Guide.module.scss";
import React from "react";
import MapComponent from "./MapComponent";


/**
 * 展示办理窗口具体信息
 * @param props 需要 {lobbyInfo}
 * @return {JSX.Element}
 * @constructor
 */
function LobbyDetails(props) {
    if (!props.lobbyInfo) {
        return <></>
    } else {
        return <>
            <div className={style.lobby}>
                <span className={style.lobbyInfo}>办理地点: </span>
                <span>{props.lobbyInfo.address ? props.lobbyInfo.address : "无"}</span>
            </div>
            <div className={style.lobby}>
                <span className={style.lobbyInfo}>咨询及投诉电话: </span>
                <span>{props.lobbyInfo.phone ? props.lobbyInfo.phone : "无"}</span>
            </div>
            <div className={style.lobby}>
                <span className={style.lobbyInfo}>办公时间: </span>
                <span>{props.lobbyInfo.office_hour ? props.lobbyInfo.office_hour : "无"}</span>
            </div>
            <MapComponent lobbyInfo={props.lobbyInfo}/>
        </>
    }
}

export default LobbyDetails
