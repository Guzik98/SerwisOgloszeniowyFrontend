import { useEffect, useState } from 'react';
import { ScreenSize } from '../types/ScreenSize';

export function useWindowSize(): ScreenSize {
    const [windowSize, setWindowSize] = useState<ScreenSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
}