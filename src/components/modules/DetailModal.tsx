import React, { useEffect, useRef } from "react";
import { Modal, Pill } from "@ui";
import { bones } from "./SideCard";

interface Coordinate {
	x: number;
	y: number;
}

interface PolygonImageProps {
	imageUrl?: string;
	coordinates?: Coordinate[];
	classes?: string;
}

const PolygonOnImage = ({
	imageUrl,
	coordinates,
	classes,
}: PolygonImageProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas: any = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		const image: any = new Image();
		image.onload = () => {
			ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

			if (ctx && coordinates?.length && classes !== undefined) {
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
				ctx.closePath();
				ctx.strokeStyle = bones.find(
					(x) => x.classes === Number(classes)
				)?.color;
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		};
		image.src = imageUrl;
	}, [imageUrl, coordinates]);

	return <canvas ref={canvasRef} className="w-full h-96" />;
};

const DetailModal = ({
	isOpen,
	onClose,
	defaultValue,
}: {
	isOpen: boolean;
	onClose: () => void;
	defaultValue?: {
		photoUrl?: string;
		coordinates: { x: number; y: number }[];
		classes?: string;
	};
}) => {
	const { photoUrl = "", coordinates, classes = "" } = defaultValue || {};
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="">
			{isOpen && (
				<div className="p-5 overflow-hidden">
					<div className="text-sm leading-4 w-3/5">
						{bones.find((x) => x.classes === Number(classes))?.name || ""}
					</div>

					<div className="flex flex-col my-3 mb-4 ">
						<span className="font-light text-xs mb-3">Details</span>
						<div>
							<Pill
								active={false}
								hidePoint
								className="!py-0.5 bg-[#FFD75C] border-[#FFD75C] text-[10px]"
							>
								{bones.find((x) => x.classes === Number(classes))?.name || ""}
							</Pill>
						</div>
					</div>

					<PolygonOnImage
						classes={classes}
						imageUrl={photoUrl}
						coordinates={coordinates}
					/>
				</div>
			)}
		</Modal>
	);
};

export default DetailModal;
