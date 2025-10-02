import { useComponentsStore } from "../../stores/components";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentEvent } from "./ComponentEvent";
import { ComponentStyle } from "./ComponentStyle";
import { Segmented } from "antd";
import { useState } from "react";
export function Setting() {
	const { curComponentId } = useComponentsStore();
	const [key, setKey] = useState("属性");
	if (!curComponentId) return null;

	return (
		<>
			<Segmented
				value={key}
				onChange={setKey}
				block
				options={["属性", "样式", "事件"]}
			></Segmented>
			<div>
				{key === "属性" && <ComponentAttr />}
				{key === "样式" && <ComponentStyle />}
				{key === "事件" && <ComponentEvent />}
			</div>
		</>
	);
}
