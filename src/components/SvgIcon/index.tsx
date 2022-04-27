import React from "react";
import Icon from "@/assets/icons/icons.svg";
interface IconProps {
    name: string;
    size?: number | string;
    color?: string;
    onClick?: React.MouseEventHandler<SVGElement>;
}

const SvgIcon: React.FunctionComponent<IconProps> = ({
    color = "currentColor",
    size = "1em",
    onClick,
    name,
}) => {
    return (
        <svg fill={color} width={size} height={size} onClick={onClick}>
            <use xlinkHref={`${Icon}#${name}`}></use>
        </svg>
    );
};
export default SvgIcon;