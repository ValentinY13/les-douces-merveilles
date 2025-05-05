export function formatPickupDate(date: string) {
    return new Intl.DateTimeFormat('fr-BE', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date))
}