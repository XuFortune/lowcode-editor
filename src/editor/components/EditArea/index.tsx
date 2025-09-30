import React, { useEffect } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import type { Component } from "../../stores/components";
export function EditArea() {
	const { components, addComponent } = useComponentsStore();
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
	return (
		<div className="h-[100%]">
			{renderComponents(components)}
			{/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
		</div>
	);
}
