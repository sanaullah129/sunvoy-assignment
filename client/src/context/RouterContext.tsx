import { createContext, useState, useEffect, type ReactNode } from 'react';

interface RouteContextType {
    path: string;
    navigate: (to: string) => void;
}

export const RouteContext = createContext<RouteContextType>({
    path: window.location.pathname,
    navigate: () => { },
});

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [path, setPath] = useState(window.location.pathname);

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        setPath(to);
    };

    useEffect(() => {
        const onPopState = () => setPath(window.location.pathname);
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    return (
        <RouteContext.Provider value={{ path, navigate }}>
            {children}
        </RouteContext.Provider>
    );
};
