import React, {ErrorInfo, ReactNode} from 'react';
import {ErrorPage} from '../ErrorPage';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return <ErrorPage/>;
        }
        return this.props.children;
    }
}
