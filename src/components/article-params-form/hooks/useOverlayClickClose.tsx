import { useEffect } from 'react';

type TUseOverlayClickClose = {
	isOpen: boolean;
	onClose: () => void;
	overlayRef: React.RefObject<HTMLDivElement>;
};

export const useOverlayClickClose = ({
	isOpen,
	onClose,
	overlayRef,
}: TUseOverlayClickClose) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !overlayRef.current?.contains(target)) {
				isOpen && onClose();
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, overlayRef]);
};
