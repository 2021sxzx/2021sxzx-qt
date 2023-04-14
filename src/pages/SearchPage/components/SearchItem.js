import style from './SearchItem.module.scss'
import {Button, message} from "antd";

export default function SearchItem(props) {
    const handleClickItem = (item, title) => {
        if (item.children.area.length === 0) {
            if (!title) {
                message.error('空事项指南');
                return
            }
            window.open(item.link, '_self');
        } else {
            props.setAreaData(item.children)
        }
    }
    return (
        <div className={style.container}>
            <div
                className={style.title}
                onClick={() => {
                    props.setAreaData(props.data);
                }}
            >
                {props.data.title}
            </div>
            <div className={style.content}>
                <div>
                    上级目录：
                    {props.data.parent}
                </div>
                <div>
                    可办地区：
                    {props.data.area.map((item) => {
                        return (
                            <Button
                                key={item}
                                onClick={() => {
                                    handleClickItem(
                                        item,
                                        props.data.title
                                    );
                                }}
                            >
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
