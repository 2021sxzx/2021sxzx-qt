import React, {useState} from "react";
import style from "./Guide.module.scss";
import {Modal, Table} from "antd";
import MaterialRequest from "./MaterialRequest";

/**
 * 展示办理材料
 * @param props 需要 {submit_documents}
 * @return {JSX.Element}
 * @constructor
 */
function Material(props) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [materialIndex, setMaterialIndex] = useState(-1)

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

    const auditMaterialColumns = [
        {
            title: '序号',
            dataIndex: 'materials_num',
            key: 'materials_num',
            className: `${style.materialTableColumn}`,
            render: (text, record, index) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: '材料名称',
            dataIndex: 'materials_name',
            key: 'materials_name',
            className: `${style.materialTableColumn}`,
        },
        {
            title: '材料形式',
            dataIndex: 'materials_form',
            key: 'materials_form',
            className: `${style.materialTableColumn}`,
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
                    }}>
                        其他要求
                    </div>
                </>
            )
        }
    ]

    const showMaterialRequest = (index) => {
        setMaterialIndex(index)
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    if (props.submit_documents === null) {
        return <div>无</div>
    } else {
        return (
            <>
                <Table
                    className={style.audit_material}
                    columns={auditMaterialColumns}
                    dataSource={props.submit_documents}
                    pagination={false}
                    size='middle'
                    rowKey={(record) => record.materials_name}
                />
                <Modal title="其他要求" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                    <MaterialRequest
                        materialIndex={materialIndex}
                        submit_documents={props.submit_documents}
                        getMaterialForm={getMaterialForm}
                    />
                </Modal>
            </>
        )
    }
}

export default Material
