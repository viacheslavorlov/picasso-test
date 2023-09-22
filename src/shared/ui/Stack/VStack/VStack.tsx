import {Flex, FlexAlign, FlexProps} from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: HStackProps) => {
	const {children, align = 'start', ref} = props;
	return (
		<Flex ref={ref} direction="column" align={align as FlexAlign} {...props}>
			{children}
		</Flex>
	);
};
