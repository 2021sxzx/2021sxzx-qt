import style from "./Guide.module.scss";
import React from "react";


/**
 * 展示其他的办理材料要求
 * @param props 需要
 * {
 *  materialIndex, // 材料索引
 *  submit_documents, // 提交的文件
 *  getMaterialForm(index), // 根据材料索引生成材料其他要求的表单
 * }
 * @return {JSX.Element}
 * @constructor
 */
function MaterialRequest(props) {
    if (props.submit_documents !== undefined && props.materialIndex !== -1) {
        const materialInfo = props.submit_documents[props.materialIndex];

        const getMaterialType = (index) => {
            switch (index) {
                case '1' :
                    return "证件证书证明"
                case '2' :
                    return "申请表格文书"
                case '3' :
                    return "其他"
                default:
                    return ""
            }
        }

        return <>
            <div
                className={materialInfo.materials_type ? null : style.detailRequest}>材料类型: {getMaterialType(materialInfo.materials_type)} </div>
            <div
                className={materialInfo.material_form ? null : style.detailRequest}>材料形式: {props.getMaterialForm(materialInfo.material_form)}</div>
            <div
                className={materialInfo.page_format ? null : style.detailRequest}>纸质材料规格: {materialInfo.page_format}</div>
            <div
                className={materialInfo.submission_required ? null : style.detailRequest}>是否免提交: {materialInfo.submissionrequired === "0" ? "否" : "是"}</div>
        </>
    }
}

export default MaterialRequest
