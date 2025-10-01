import React, { useEffect, useState, type MouseEventHandler } from "react";
import HoverMask from "../HoverMask";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import type { Component } from "../../stores/components";
import SelectedMask from "../SelectMask";
export function EditArea() {
	const { components,curComponentId,setCurComponentId } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	function renderComponents(components: Component[]): React.ReactNode {
		return components.map((component: Component) => {
			const config = componentConfig?.[component.name];
			if (!config.component) {
				return null;
			}
			return React.createElement(
				config.component,
				{
					key: component.id,
					id: component.id,
					name: component.name,
					...config.defaultProps,
					...component.props,
				},
				renderComponents(component.children || []),
			);
		});
	}

	const [hoverComponentId, setHoverComponentId] = useState<number>();
	const handleMouseOver: MouseEventHandler = (e) => {
		const path = e.nativeEvent.composedPath();
		for (let i = 0; i < path.length; i++) {
			const ele = path[i] as HTMLElement;
			const componentId = ele.dataset.componentId;
			if (componentId) {
				setHoverComponentId(+componentId);
				return;
			}
		}
	};
	const handleClick:MouseEventHandler=(e)=>{
		const path = e.nativeEvent.composedPath()
		for(let i= 0;i<path.length;i++){
			const ele = path[i] as HTMLElement

			const componentId = ele.dataset.componentId
			if(componentId){
				setCurComponentId(+componentId)
				return
			}
		}
	}

	return (
		<div
			className="h-[100%] edit-area"
			onMouseOver={handleMouseOver}
			onMouseLeave={() => {
				setHoverComponentId(undefined);
			}}
			onClick={handleClick}
		>
			{renderComponents(components)}
			{hoverComponentId && hoverComponentId!==curComponentId && (
				<HoverMask
					portalWrapperClassName="portal-wrapper"
					containerClassName="edit-area"
					componentId={hoverComponentId}
				></HoverMask>
			)}
			{curComponentId&&(
				 <SelectedMask
				 portalWrapperClassName='portal-wrapper'
				 containerClassName='edit-area'
				 componentId={curComponentId}
			 />
			)}
			<div className="portal-wrapper"></div>
			{/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
		</div>
	);
}
