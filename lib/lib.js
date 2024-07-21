import { useMediaQuery } from '@mantine/hooks';

import {
    useMantineTheme,
} from '@mantine/core';

import { createClient } from '@supabase/supabase-js'

import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

export const supabaseClient = createClient('https://kezujmhfbxgndlzdefwe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlenVqbWhmYnhnbmRsemRlZndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MTA1NjYsImV4cCI6MjAzNjk4NjU2Nn0.o8l3QZSIrzu6cVWAT4f0y2VIhKtxTK3rBe6A-ehShtQ');

const SessionContext = createContext({
    isLoading: true,
    session: null,
    error: null,
    supabaseClient: {}
});

export const SessionContextProvider = ({
    children
}) => {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        let mounted = true;

        async function getSession() {
            const {
                data: { session },
                error
            } = await supabaseClient.auth.getSession();

            // only update the react state if the component is still mounted
            if (mounted) {
                if (error) {
                    setError(error);
                    setIsLoading(false);
                    return;
                }

                setSession(session);
                setIsLoading(false);
            }
        }

        getSession();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        const {
            data: { subscription }
        } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (
                session &&
                (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED')
            ) {
                setSession(session);
            }

            if (event === 'SIGNED_OUT') {
                setSession(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = useMemo(() => {
        if (isLoading) {
            return {
                isLoading: true,
                session: null,
                error: null,
                supabaseClient
            };
        }

        if (error) {
            return {
                isLoading: false,
                session: null,
                error,
                supabaseClient
            };
        }

        return {
            isLoading: false,
            session,
            error: null,
            supabaseClient
        };
    }, [isLoading, session, error]);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(`useSessionContext must be used within a SessionContextProvider.`);
    }

    return context;
};

export function useSupabaseClient() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(`useSupabaseClient must be used within a SessionContextProvider.`);
    }

    return context.supabaseClient;
}

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(`useSession must be used within a SessionContextProvider.`);
    }

    return context.session;
};

export const useUser = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a SessionContextProvider.`);
    }

    return context.session?.user ?? null;
};

export const useIsMobile = () => {
    const theme = useMantineTheme();

    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, process.env.NEXT_PUBLIC_IS_MOBILE || false);

    return isMobile;
}
