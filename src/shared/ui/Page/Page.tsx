import {classNames} from '../../lib/classNames/classNames';
import cls from './Page.module.css';
import {memo, ReactNode} from 'react';

interface PageProps {
	className?: string;
	children: ReactNode;
}

export const Page = memo((props: PageProps) => {
	const {
		className, children
	} = props;

	return (
		<div className={classNames(cls.Page, className)}>
			{children}
		</div>
	);
});
