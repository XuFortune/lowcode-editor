import { create } from "zustand";
import Button from "../materials/Button";
import Container from "../materials/Container";
import Page from "../materials/Pages";
export interface ComponentConfig {
	name: string;
	desc:string;
	defaultProps: Record<string, any>;
	component: any;
}

interface State {
	componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
	registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
	componentConfig: {
		Container: {
			name: "Container",
			defaultProps: {},
			desc:'容器',
			component: Container,
		},
		Button: {
			name: "Button",
			defaultProps: {
				type: "primary",
				text: "按钮",
			},
			desc:'按钮',
			component: Button,
		},
		Page: {
			name: "Page",
			defaultProps: {},
			desc:'页面',
			component: Page,
		},
	},
	registerComponent: (name, componentConfig) =>
		set((state) => {
			return {
				...state,
				componentConfig: {
					...state.componentConfig,
					[name]: componentConfig,
				},
			};
		}),
}));
