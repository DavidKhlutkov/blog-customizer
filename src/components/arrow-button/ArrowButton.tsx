import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	/** Функция для обработки открытия/закрытия формы */
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	// управление стилями открытого и закрытого состояния
	const stylesContainer: string = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const stylesArrow: string = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: isOpen,
	});
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={stylesContainer}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={stylesArrow} />
		</div>
	);
};
