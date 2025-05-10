export const useRevealTransitionItems = () => {
    const observer = ref<IntersectionObserver | null>(null)

    const initRevealObserver = () => {
        if (observer.value) return // Ne pas réinitialiser si déjà fait

        observer.value = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement
                    el.classList.remove('reveal')
                    observerInstance.unobserve(el)
                }
            })
        }, {
            threshold: 0.1
        })

        const elements = document.querySelectorAll('[class*="reveal-"].reveal')
        elements.forEach(el => observer.value?.observe(el))
    }

    onMounted(() => {
        if (import.meta.client) {
            initRevealObserver()
        }
    })

    onBeforeUnmount(() => {
        observer.value?.disconnect()
    })

}



