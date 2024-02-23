import { create } from "zustand";
import DetailModal from "./modules/DetailModal";

export enum ModalTypes {
	DETAIL_MODAL = "DETAIL_MODAL",
}

type AppModal = {
	modal: ModalTypes;
	modalProps: Record<string, any>;
};

type Store = {
	activeModal: AppModal[];
	closeModal: (modal: ModalTypes) => void;
	openModal: (modal: ModalTypes, modalProps?: Record<string, any>) => void;
};

export const useModalStore = create<Store>((set) => ({
	activeModal: [],
	closeModal: (mod) =>
		set((state) => ({
			activeModal: state?.activeModal?.filter(({ modal }) => modal !== mod),
		})),

	openModal: (modal, modalProps = {}) =>
		set(({ activeModal }) => ({
			activeModal: [
				...activeModal?.filter(({ modal: mod }) => mod !== modal),
				{ modal, modalProps },
			],
		})),
}));

const Modals = [
	{
		component: DetailModal,
		value: ModalTypes.DETAIL_MODAL,
	},
];

export const GlobalModals = () => {
	const { activeModal, closeModal } = useModalStore();

	return (
		<>
			{Modals.map(({ value, component: Component }) => {
				return (
					<Component
						isOpen={activeModal?.some(({ modal }) => modal === value)}
						key={value}
						onClose={() => closeModal(value)}
						{...activeModal.find(({ modal }) => modal === value)?.modalProps}
					/>
				);
			})}
		</>
	);
};
