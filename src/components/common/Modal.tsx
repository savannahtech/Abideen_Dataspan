"use client";
import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

type Props = {
	isOpen: boolean;
	children: ReactNode;
	onClose: () => void;
	className?: string;
	header?: ReactNode;
};

export const Modal = ({
	isOpen,
	onClose,
	children,
	className,
	header,
}: Props) => {
	return (
		<Transition.Root as={Fragment} show={isOpen}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-[#C9C9C999] bg-opacity-60 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10">
					<div className="flex h-full items-center justify-center overflow-hidden md:p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className={classNames(
									"relative flex max-h-full w-full  max-w-md transform flex-col rounded-lg bg-white p-4 shadow-xl transition-all",
									className
								)}
							>
								<button
									className="w-5 h-5 absolute right-5 top-5 text-[#D1D1D6]"
									onClick={onClose}
								>
									X
								</button>
								<div>{header}</div>
								<div className="h-max max-h-full overflow-hidden">
									{children}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
