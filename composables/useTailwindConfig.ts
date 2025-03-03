export function useTailwindConfig() {
    function getValue(key: string) {
        if (import.meta.client) {
            const styles = getComputedStyle(document.documentElement);
            return styles.getPropertyValue(key);
        } else {
            return '';
        }
    }

    return {
        getValue
    }

}