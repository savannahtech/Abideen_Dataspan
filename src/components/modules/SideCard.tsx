"use client";

import React, { useCallback, useMemo } from "react";

import Image from "next/image";
import { Pill } from "@ui";
import { BinIcon } from "../icons";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
	polygon: number | null;
	setPolygon: (val: number) => void;
	classe: number[];
	setClasses: (val: number[]) => void;
};

export const bones = [
	{
		name: "Elbow positive",
		color: "#3D9BE9",
		classes: 0,
	},
	{
		name: "Finger positive",
		color: "#BADA55",
		classes: 1,
	},
	{
		name: "Humerus",
		color: "#2CE1CB",
		classes: 2,
	},
	{
		name: "Forearm fracture",
		color: "#FFD75C",
		classes: 3,
	},
	{
		name: "Humerus fracture",
		color: "#F25858",
		classes: 4,
	},
	{
		name: "Shoulder fracture",
		color: "#F25858",
		classes: 5,
	},
	{
		name: "Wrist positive",
		color: "#D783FF",
		classes: 6,
	},
];

export default function SideCard({
	polygon,
	setPolygon,
	classe,
	setClasses,
}: Props) {
	return (
		<div className="sticky top-8 h-[calc(100vh-4rem)] flex flex-col">
			<div className="h-16 w-60 relative mb-8">
				<Image src="/Logo.png" fill alt="logo" />
			</div>
			<div className="mb-3">
				<h2 className=" font-semibold text-sm">Classes filter</h2>
			</div>
			<div className="flex gap-x-4 mb-4">
				<button
					onClick={() => setClasses(bones.map((x) => Number(x.classes)))}
					className="font-normal text-sm leading-[14.63px] text-[#D1D1D6]"
				>
					Select all
				</button>
				<Link href="/">
					<button
						onClick={() => {
							setClasses([]);
						}}
						className="font-normal text-sm leading-[14.63px] text-[#2081D2]"
					>
						Deselect all
					</button>
				</Link>
			</div>
			<div className="flex flex-wrap gap-3 mb-5">
				{bones.map(({ name, color, classes }) => (
					<Pill
						active={classe.includes(Number(classes))}
						color={color}
						className={`!text-[${color}]`}
						key={name}
						onClick={() => {
							const newVal = classe.includes(Number(classes))
								? classe.filter((x) => x !== Number(classes))
								: [...classe, Number(classes)];

							setClasses(newVal);
						}}
					>
						{name}
					</Pill>
				))}
			</div>
			<div className="mb-4">
				<h2 className=" font-semibold text-sm">Poligon range</h2>
			</div>
			<div className="flex flex-col">
				<div className="flex justify-between text-xs">
					<span>
						min <b className=" font-medium">0</b>
					</span>
					<span>
						max <b className=" font-medium">4</b>
					</span>
				</div>
				<div className="w-full mt-2">
					<input
						value={String(polygon)}
						type="range"
						className="w-full"
						min={0}
						max={4}
						onChange={(e) => setPolygon(Number(e.target.value))}
					/>
				</div>
			</div>
			<div className="flex items-center mt-4 justify-between">
				<Link
					href="/"
					className="text-xs font-semibold"
					onClick={() => {
						setPolygon(0);
					}}
				>
					<BinIcon className="inline-block mr-1" />
					Clear Filters
				</Link>

				<button className=" text-black/50 text-xs">Need help?</button>
			</div>
		</div>
	);
}
