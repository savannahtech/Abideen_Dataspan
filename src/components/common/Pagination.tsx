"use client";
import React from "react";
import { Pagination as ReactPaginate } from "react-headless-pagination";

type PaginationProps = {
	onPageChange: (selected: number) => void;
	pageCount: number;
	isLoading?: boolean;
	page: number;
};
export const Pagination = ({
	pageCount,
	onPageChange,
	page,

	isLoading,
}: PaginationProps) => {
	if (pageCount < 2 || isLoading) return null;

	return (
		<ReactPaginate
			className="flex"
			currentPage={page - 1}
			edgePageCount={2}
			middlePagesSiblingCount={2}
			setCurrentPage={(selectedPage) => onPageChange(selectedPage + 1)}
			totalPages={pageCount}
			truncableClassName=""
			truncableText="..."
		>
			<ReactPaginate.PrevButton className="flex aspect-square w-8 cursor-pointer items-center  justify-center rounded text-sm !text-brand-blue">
				{"<"}
			</ReactPaginate.PrevButton>

			<nav className="flex flex-grow justify-center">
				<ul className="flex items-center gap-x-3">
					<ReactPaginate.PageButton
						activeClassName="border !bg-[#FFD75C] !text-white border-[#FFD75C]"
						className="bg-[#D1D1D6] flex aspect-square w-6 h-6 cursor-pointer  items-center justify-center rounded-full text-sm text-black"
						inactiveClassName=""
					/>
				</ul>
			</nav>

			<ReactPaginate.NextButton className="flex aspect-square w-8 cursor-pointer items-center  justify-center rounded text-sm !text-brand-blue">
				{">"}
			</ReactPaginate.NextButton>
		</ReactPaginate>
	);
};
