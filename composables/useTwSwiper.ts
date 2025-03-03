export const useTwSwiper = () => {

    // const {getValue} = useTailwindConfig();

    const arrayToRGBString = (rgb: number[], opacity?: number) => {
        if (opacity !== undefined) return `rgba(${rgb.join(',')}, ${opacity})`

        return `rgb(${rgb.join(',')})`
    };

    const hexToRGBArray = (hex: string) => hex.match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));

    const hexToRGBString = (hex: string, opacity?: number) => arrayToRGBString(hexToRGBArray(hex), opacity);

    function swiperOverflowVisible() {
        return `
    .swiper {
        overflow: visible;
    }`
    }

    //
    // function swiperPagination(theme: 'red' | 'white' | 'grey' = 'grey') {
    //     let color;
    //
    //     switch (theme) {
    //         case 'red':
    //             color = config.theme.colors.red["100"];
    //             break;
    //         case 'white':
    //             color = config.theme.colors.white;
    //             break;
    //         case 'grey':
    //             color = config.theme.colors.grey["600"];
    //             break;
    //     }
    //
    //     return `
    // .swiper {
    //   padding-bottom: 64px;
    // }
    //
    // .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    //
    // --swiper-pagination-bottom: 0;
    // }
    //
    // .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    // --swiper-pagination-bullet-horizontal-gap: 8px;
    // }
    //
    // .swiper-pagination-bullet {
    // --swiper-pagination-bullet-size: 12px;
    // --swiper-pagination-bullet-inactive-opacity: 0.5;
    // --swiper-pagination-bullet-inactive-color: ${hexToRGBString(color)};
    // }
    //
    // .swiper-pagination-bullet-active {
    // --swiper-pagination-color: ${color};
    // }
    //   `
    // }


    return {
        // swiperPagination,
        swiperOverflowVisible
    }

}