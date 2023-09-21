import {
	DetailedHTMLProps, HTMLAttributes, ReactNode,
} from 'react';
import cls from './FLex.module.css';
import {classNames} from '../../../lib/classNames/classNames';


export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32'

const justifyClasses: Record<FlexJustify, string> = {
	start: cls.justifyStart,
	end: cls.justifyEnd,
	center: cls.justifyCenter,
	between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
	start: cls.alignStart,
	end: cls.alignEnd,
	center: cls.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
	row: cls.directionRow,
	column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
	'4': cls.gap4,
	'8': cls.gap8,
	'16': cls.gap16,
	'32': cls.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps{
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

export const Flex = (props: FlexProps) => {
	const {
		className,
		children,
		justify = 'start',
		align = 'center',
		direction = 'row',
		gap,
		max,
	} = props;

	const maxWidth = max ? cls.max: undefined;

	const classes = [
		className,
		justifyClasses[justify],
		alignClasses[align],
		directionClasses[direction],
		gap && gapClasses[gap],
	];

	return (
		<div className={classNames(cls.FLex, maxWidth, ...classes)}>
			{children}
		</div>
	);
};
