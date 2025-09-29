import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<DndProvider backend={HTML5Backend}>
		<App />
	</DndProvider>,
);
