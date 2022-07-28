import React, {useEffect, useState} from "react";
import {Radio} from "antd";
import LobbyDetails from "./LobbyDetails";

/**
 * 展示办理地点的相关信息
 * @param props 需要 {lobbyList}
 * @return {JSX.Element}
 */
function LobbyWindows(props) {
    // 当前要展示的办理窗口的信息
    const [lobbyInfo, setLobbyInfo] = useState();

    useEffect(() => {
        setLobbyInfo(props.lobbyList instanceof Array ? props.lobbyList[0] : null)
    }, [props.lobbyList])

    // 切换当前展示的办理窗口信息
    const changeLobby = (lobbyList, lobbyIndex) => {
        setLobbyInfo(lobbyList[lobbyIndex])
    }

    // 如果有办理窗口的信息就展示，没有就展示 “无线下办理窗口”。其中 name 是 lobbyInfo 的必要属性。
    if (lobbyInfo && lobbyInfo.name) {
        return (
            <>
                {/*选择要的办理窗口选项*/}
                <Radio.Group
                    className='lobbyGroup'
                    name='lobbyGroup'
                    defaultValue={lobbyInfo.name}
                    buttonStyle="solid"
                >
                    {
                        props.lobbyList?.map((item, index) => {
                            return (
                                <Radio.Button
                                    className="lobbyButton"
                                    onClick={() => {
                                        changeLobby(props.lobbyList, index)
                                    }}
                                    value={item?.name}
                                    key={item?.name}
                                >{item?.name}</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
                {/*展示所选办理窗口的具体信息*/}
                <LobbyDetails lobbyInfo={lobbyInfo}/>
            </>
        )
    } else {
        return <div>无线下办理窗口</div>
    }
}

export default LobbyWindows
