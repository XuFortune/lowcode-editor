import { useEffect, useRef } from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import type { CommonComponentProps } from "../../interface";

function Page({ id, children }: CommonComponentProps) {
	const ref = useRef(null);
	const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);
	useEffect(() => {
		drop(ref);
	}, []);
	return (
		<div
			data-component-id={id}
			ref={ref}
			className="p-[20px] h-[100%] box-border"
			style={{ border: canDrop ? "2px solid blue" : "none" }}
		>
			{children}
		</div>
	);
}

export default Page;
