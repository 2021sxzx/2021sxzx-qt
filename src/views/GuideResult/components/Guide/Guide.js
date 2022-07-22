import './button.scss'
import style from './Guide.module.scss';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Divider, Modal, Radio, Table} from 'antd';
import {Map, Marker, NavigationControl} from 'react-bmapgl';
import {GetItemGuide} from '../../../../api/guideApi'

export default function Guide() {
    const {pathname} = useLocation();
    const [data, setData] = useState({});
    const [lobbyInfo, setLobbyInfo] = useState({});
    const [lobbyLocation, setLobbyLocation] = useState({});
    const [materialIndex, setMaterialIndex] = useState(-1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const auditMaterialColumns = [
        {
            title: '序号',
            dataIndex: 'materials_num',
            key: 'materials_num',
            render: (text, record, index) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: '材料名称',
            dataIndex: 'materials_name',
            key: 'materials_name'
        },
        {
            title: '材料形式',
            dataIndex: 'materials_form',
            key: 'materials_form',
            render: (text, record) => (
                <>
                    <div>原件: {record.origin}</div>
                    <div>复印件: {record.copy}</div>
                    <div>{getMaterialForm(record.material_form)}</div>
                </>
            )
        },
        {
            title: '材料要求',
            dataIndex: 'materials_req',
            key: 'materials_req',
            render: (text, record, index) => (
                <>
                    <div>{getMaterialNecessity(record.material_necessity)}</div>
                    <div className={style.materialRequest} onClick={() => {
                        showMaterialRequest(index)
                    }}>其他要求
                    </div>
                </>
            )
        }
    ];

    // useEffect(() => {
    // 	axios.get(pathname).then(res => {
    // 		console.log(pathname)
    // 		console.log(res.data)
    // 		setData(res.data[0]);
    // 		setLobbyInfo(res.data[0].audit_catalog_lobby[0]);
    // 	})
    // }, []);

    useEffect(() => {
        GetItemGuide({"task_code": pathname.slice(15)}).then(res => {
            console.log(res.data.data)
            setData(res.data.data);
            if (res.data.data.windows !== null) {
                setLobbyInfo(res.data.data.windows[0]);
            } else {
                setLobbyInfo(null);
            }
        })
    }, []);

    const getMaterialForm = (index) => {
        switch (index) {
            case '1' :
                return "纸质";
            case '2' :
                return "电子化";
            case '3' :
                return "纸质/电子化";
        }
    }

    const getMaterialNecessity = (index) => {
        switch (index) {
            case '1' :
                return "必要";
            case '2' :
                return "非必要";
            case '3' :
                return "容缺后补";
        }
    }

    const getMaterialType = (index) => {
        switch (index) {
            case '1' :
                return "证件证书证明";
            case '2' :
                return "申请表格文书";
            case '3' :
                return "其他";
        }
    }

    const showMaterialRequest = (index) => {
        setMaterialIndex(index)
        showModal()
    };

    const renderMaterial = () => {
        if (data.submit_documents === null) {
            return <div>无</div>
        } else {
            return <Table className={style.audit_material} columns={auditMaterialColumns}
                          dataSource={data.submit_documents} pagination={false} size='middle'/>
        }
    }

    const changeLobby = (lobbyList, lobbyIndex) => {
        setLobbyInfo(lobbyList[lobbyIndex])
    };

    const renderLobby = (lobbyList) => {
        if (lobbyInfo && lobbyInfo.name) {
            return <Radio.Group className='lobbyGroup' name='lobbyGroup' defaultValue={lobbyInfo.name}
                                buttonStyle="solid">{
                lobbyList?.map((item, index) => {
                    return <Radio.Button className="lobbyButton" onClick={() => {
                        changeLobby(lobbyList, index)
                    }} value={item?.name} key={item?.name}>{item?.name}</Radio.Button>
                })
            }</Radio.Group>
        }
    };

    const renderLobbyDetails = () => {
        console.log(lobbyInfo)
        if (lobbyInfo === null) {
            return <div>无线下办理窗口</div>
        } else {
            return <>
                <div className={style.lobby}>
                    <span className={style.lobbyInfo}>办理地点: </span>
                    <span>{lobbyInfo === undefined ? "无" : lobbyInfo.address}</span>
                </div>
                <div className={style.lobby}>
                    <span className={style.lobbyInfo}>咨询及投诉电话: </span>
                    <span>{lobbyInfo === undefined ? "无" : lobbyInfo.phone}</span>
                </div>
                <div className={style.lobby}>
                    <span className={style.lobbyInfo}>办公时间: </span>
                    <span>{lobbyInfo === undefined ? "无" : lobbyInfo.office_hour}</span>
                </div>
                <div>{renderMap()}</div>
            </>
        }
    }

    const renderMaterialRequest = () => {
        if (data.submit_documents !== undefined && materialIndex !== -1) {
            /*data.submit_documents[materialIndex].materials_type*/
			const tmp = data.submit_documents[materialIndex];
			return <>
                <div
                    className={tmp.materials_type ? null : style.detailRequest}>材料类型: {getMaterialType(data.submit_documents[materialIndex].materials_type)} </div>
                <div
                    className={tmp.material_form ? null : style.detailRequest}>材料形式: {getMaterialForm(data.submit_documents[materialIndex].material_form)}</div>
                <div
                    className={tmp.page_format ? null : style.detailRequest}>纸质材料规格: {data.submit_documents[materialIndex].page_format}</div>
                <div
                    className={tmp.submission_required ? null : style.detailRequest}>是否免提交: {data.submit_documents[materialIndex].submissionrequired === "0" ? "否" : "是"}</div>
            </>
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddress = (address) => {
        const index = address?.indexOf('号');
        return address?.slice(0, index + 1);
    }

    useEffect(() => {
        if (lobbyInfo) {
			const myGeo = new window.BMapGL.Geocoder();
			myGeo.getPoint(handleAddress(lobbyInfo?.address), function (point) {
                if (point) {
                    setLobbyLocation(point);
                } else {
                    alert('您选择的地址没有解析到结果！');
                }
            }, '广州市')
        }
    }, [lobbyInfo]);

    const renderMap = () => {
        if (lobbyInfo) {
            return <div className={style.mapContainer}>
                <div className={style.lobby}>
                    <span className={style.lobbyInfo}>交通指南: </span>
                </div>
                <Map className={style.map} enableScrollWheelZoom center={lobbyLocation} zoom={16}>
                    <Marker position={lobbyLocation}/>
                    <NavigationControl/>
                </Map>
            </div>
        }
    }

    return (
        <div className={style.container}>
            <div className={style.title}>{data.task_name}</div>
            <div className={style.GB_name}>国家标准名: {data.task_name}</div>
            <span className={style.button}>事项办理</span>
            <span className={style.button}>详细指南</span>
            <span className={style.button}>打印咨询结果</span>
            <Divider/>
            <div className={style.subtitle}>申请材料</div>
            {renderMaterial()}
            <div className={style.subtitle}>办理地点</div>
            {renderLobby(data.windows)}
            {renderLobbyDetails()}

            <div className={style.subtitle}>网上办理流程</div>
            <div className={style.wsbllc}>{data.wsbllc ? data.wsbllc : "无"}</div>
            <div className={style.subtitle}>线下办理流程</div>
            <div className={style.ckbllc}>{data.ckbllc ? data.ckbllc : "无"}</div>
            <Modal title="其他要求" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {renderMaterialRequest()}
            </Modal>

        </div>
    );
}
