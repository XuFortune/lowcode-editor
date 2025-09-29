import { message } from "antd";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

function Page({ children }: PropsWithChildren) {
	const ref = useRef(null);
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: ["Button", "Container"],
		drop: (item: { type: string }) => {
			console.log(item);
			message.success(item.type);
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
		}),
	}));
	useEffect(() => {
		drop(ref);
	});

	return (
		<div
			ref={ref}
			className="p-[20px] h-[100%] box-border"
			style={{ border: canDrop ? "2px solid blue" : "none" }}
		>
			{children}
		</div>
	);
}

export default Page;
