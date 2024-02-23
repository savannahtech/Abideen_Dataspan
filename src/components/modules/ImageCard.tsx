import React, { useRef, useEffect } from "react";
import { ModalTypes, useModalStore } from "../GlobalModal";
import { bones } from "./SideCard";

type Props = {
	photoUrl: string;
	coordinates: { x: number; y: number }[];
	classes: string;
	name?: string;
};

export const ImageCard = ({ photoUrl, coordinates, classes }: Props) => {
	const canvasRef = useRef(null);
	const { openModal } = useModalStore();

	useEffect(() => {
		const canvas: any = canvasRef.current;
		if (!canvas) {
			console.error("Canvas element is not initialized");
			return;
		}
		const ctx: any = canvas.getContext("2d");

		const image = new Image(100, 100) as HTMLImageElement;
		image.onload = () => {
			ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

			if (coordinates.length) {
				ctx.beginPath();
				ctx.moveTo(
					coordinates[0].x * canvas.width,
					coordinates[0].y * canvas.height
				);

				for (let i = 1; i < coordinates.length; i++) {
					ctx.lineTo(
						coordinates[i].x * canvas.width,
						coordinates[i].y * canvas.height
					);
				}
				ctx?.closePath();
				ctx.strokeStyle = bones.find(
					(x) => x.classes === Number(classes)
				)?.color;
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		};
		image.onerror = () => {
			console.error("Failed to load the image");
		};
		image.src = photoUrl;
	}, [photoUrl, coordinates]);

	return (
		<canvas
			ref={canvasRef}
			width={100}
			height={100}
			onClick={() =>
				openModal(ModalTypes.DETAIL_MODAL, {
					defaultValue: {
						photoUrl,
						coordinates,
						classes,
					},
				})
			}
		/>
	);
};
