import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOverlayClickClose } from './hooks/useOverlayClickClose';
import { Text } from '../text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState(props: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	// Состояния открытия/закрытия формы
	const [isOpen, setIsOpen] = useState(false);
	const [fontfamily, setFontfamily] = useState(articleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);

	const stylesContainer = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const handleOpenForm = () => {
		setIsOpen(!isOpen);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontfamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
		setIsOpen(false);
	};

	const handleFormReset = () => {
		setIsOpen(false);
		setFontfamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		setArticleState(defaultArticleState);
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useOverlayClickClose({
		isOpen: isOpen,
		overlayRef: rootRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleOpenForm} />
			<aside className={stylesContainer}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as={'h2'} size={31} weight={800} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontfamily}
						onChange={setFontfamily}
						title='Выберите шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						name='font-size'
						onChange={setFontSize}
						title='Выберите размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
						title='Выберите цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
						title='Выберите цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
						title='Выберите ширину контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
