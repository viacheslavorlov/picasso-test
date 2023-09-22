import {throttle} from '@/shared/lib/throttle/throttle';
import { useEffect, useState } from 'react';

export function useWindowSize(delay: number) {
    const [width, setWidth] = useState(window.innerWidth || 0);
    const [height, setHeight] = useState(window.innerHeight ||0);

    const setWindowSize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        setWindowSize();
        const throttledSetWindowSize = throttle(setWindowSize, delay); // Используем throttle с задержкой в 200 миллисекунд

        window.addEventListener('resize', throttledSetWindowSize);
        window.addEventListener('orientationchange', setWindowSize); // Добавляем обработчик для события изменения ориентации

        return () => {
            window.removeEventListener('resize', throttledSetWindowSize);
            window.removeEventListener('orientationchange', setWindowSize);
        };
    }, [delay]);

    return { width, height };
}
