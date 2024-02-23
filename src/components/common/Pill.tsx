"use client";
import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: string;
	hidePoint?: boolean;
	active: boolean;
};

export function Pill({
	className,
	color,
	children,
	hidePoint,
	active,
	...props
}: ButtonProps) {
	return (
		<button
			className={classNames(
				`rounded-full px-3 py-2  flex justify-center items-center  text-xs font-medium border`,
				className
			)}
			style={{
				borderColor: color,
				backgroundColor: active ? color : "",
			}}
			{...props}
		>
			{!hidePoint && (
				<div
					className={`h-2 w-2 rounded-full bg-current mr-2`}
					style={{
						background: color,
					}}
				/>
			)}
			{children}
		</button>
	);
}
