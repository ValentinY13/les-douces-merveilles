export const useDefaultBreakpoints = () => {
    const keys = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

    const {getValue} = useTailwindConfig();

    const twBreakpoints = Object.fromEntries(
        keys.map(key => [key, parseInt(getValue(`--breakpoint-${key}`).replace('rem', '')) * 16])
    );

    const breakpoints = useBreakpoints<typeof keys[number]>(twBreakpoints);

    return {breakpoints};
};