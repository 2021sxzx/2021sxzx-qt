import React, {useEffect, useState} from "react";
import {message} from "antd";
import style from "./Guide.module.scss";
import {Map, MapApiLoaderHOC, Marker, NavigationControl} from "react-bmapgl";

/**
 * 展示办理窗口的交通地图
 * @param props 需要 {lobbyInfo:{},//办理窗口的具体信息}
 * @return {JSX.Element}
 * @constructor
 */
function MapComponent(props) {
    // 办理窗口的位置
    const [lobbyLocation, setLobbyLocation] = useState({})

    // 创建 Geo 对象
    const myGeo = new window.BMapGL.Geocoder()

    useEffect(() => {
        // 获取所选择的办理窗口的位置
        myGeo.getPoint(handleAddress(props.lobbyInfo?.address), function (point) {
            if (point) {
                setLobbyLocation(point);
            } else {
                message.warn('您选择的地址没有解析到结果！')
            }
        }, '广州市')
    }, [window])

    // 如果没有办理窗口的信息，就不展示地图
    if (!props.lobbyInfo) {
        return <></>
    }

    // 解析办理窗口的地址，转化成字符串
    const handleAddress = (address) => {
        const index = address?.indexOf('号');
        return address?.slice(0, index + 1);
    }


    return (
        <div className={style.mapContainer}>
            <div className={style.lobby}>
                <span className={style.lobbyInfo}>交通地图: </span>
            </div>
            <Map className={style.map} enableScrollWheelZoom center={lobbyLocation} zoom={16}>
                <Marker position={lobbyLocation}/>
                <NavigationControl/>
            </Map>
        </div>
    )
}

// export default MapComponent

export default MapApiLoaderHOC({ak: 'MKK4W40GgyXkahUdTdxNhCwL3RG7CZ2U'})(MapComponent)
