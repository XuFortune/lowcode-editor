import { Button as AntdButton } from "antd";
import type { CommonComponentProps } from "../../interface";

export interface ButtonProps {
	type: CommonComponentProps;
	text: string;
}

const Button = ({ id, type, text }: CommonComponentProps) => {
	return (
		<AntdButton data-component-id={id} type={type}>
			{text}
		</AntdButton>
	);
};

export default Button;
