import { useMediaQuery } from '@mantine/hooks';

import {
    useMantineTheme,
} from '@mantine/core';

export function useIsMobile() {
    const theme = useMantineTheme();

    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, process.env.NEXT_PUBLIC_IS_MOBILE || false);

    return isMobile;
}