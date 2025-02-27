import plugin from 'tailwindcss/plugin';

export default plugin(function ({addUtilities, theme, matchUtilities}) {


        const SM_DEVICE_WIDTH = 640;
        const MD_DEVICE_WIDTH = 768;
        const LG_DEVICE_WIDTH = 1024;
        const XL_DEVICE_WIDTH = 1280;
        // const XXL_DEVICE_WIDTH = 1536;

        // Device gutter width
        const SM_GUTTER_WIDTH = 24;
        const MD_GUTTER_WIDTH = 24;
        const LG_GUTTER_WIDTH = 24;
        const XL_GUTTER_WIDTH = 24;
        // const XXL_GUTTER_WIDTH = 24;

        // Device column width
        const SM_COLUMN_WIDTH = 161;
        const MD_COLUMN_WIDTH = 69;
        const LG_COLUMN_WIDTH = 101;
        const XL_COLUMN_WIDTH = 101;
        // const XXL_COLUMN_WIDTH = 102;

        const SM_CONTENT_MAX_WIDTH = 2 * SM_COLUMN_WIDTH + SM_GUTTER_WIDTH;
        const MD_CONTENT_MAX_WIDTH = MD_COLUMN_WIDTH * 8 + MD_GUTTER_WIDTH * 9;
        const LG_CONTENT_MAX_WIDTH = LG_COLUMN_WIDTH * 8 + LG_GUTTER_WIDTH * 9;
        const XL_CONTENT_MAX_WIDTH = XL_COLUMN_WIDTH * 10 + XL_GUTTER_WIDTH * 11;
        // const XXL_CONTENT_MAX_WIDTH = XXL_COLUMN_WIDTH * 12 + XXL_GUTTER_WIDTH * 13;

        const SM_PADDING = 30;
        const MD_PADDING = 15 + 29;
        const LG_PADDING = 30;
        const XL_PADDING = 90;
        // const XXL_PADDING = 90;


        // Construct column and gutter layouts

        const layoutObject: { [key: string]: any } = {};

        const layouts = {
            sm: {
                c: SM_COLUMN_WIDTH,
                g: SM_GUTTER_WIDTH,
            },
            md: {
                c: MD_COLUMN_WIDTH,
                g: MD_GUTTER_WIDTH,
            },
            lg: {
                c: LG_COLUMN_WIDTH,
                g: LG_GUTTER_WIDTH,
            },
            xl: {
                c: XL_COLUMN_WIDTH,
                g: XL_GUTTER_WIDTH,
            },
            // xxl: {
            //     c: XXL_COLUMN_WIDTH,
            //     g: XXL_GUTTER_WIDTH,
            // }
        };

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                for (const [key, value] of Object.entries(layouts)) {
                    layoutObject[`.layout-${key}-c-${i}-g-${j}`] = {
                        width: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.max-layout-${key}-c-${i}-g-${j}`] = {
                        maxWidth: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.min-layout-${key}-c-${i}-g-${j}`] = {
                        minWidth: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.p-layout-${key}-c-${i}-g-${j}`] = {
                        padding: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.pl-layout-${key}-c-${i}-g-${j}`] = {
                        paddingLeft: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.pr-layout-${key}-c-${i}-g-${j}`] = {
                        paddingRight: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.pt-layout-${key}-c-${i}-g-${j}`] = {
                        paddingTop: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.pb-layout-${key}-c-${i}-g-${j}`] = {
                        paddingBottom: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.px-layout-${key}-c-${i}-g-${j}`] = {
                        paddingLeft: (value.c * i + value.g * j) + 'px',
                        paddingRight: (value.c * i + value.g * j) + 'px',
                    };

                    layoutObject[`.py-layout-${key}-c-${i}-g-${j}`] = {
                        paddingTop: (value.c * i + value.g * j) + 'px',
                        paddingBottom: (value.c * i + value.g * j) + 'px',
                    };

                    // Margins

                    layoutObject[`.lg-layout-${key}-c-${i}-g-${j}`] = {
                        margin: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.ml-layout-${key}-c-${i}-g-${j}`] = {
                        marginLeft: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.mr-layout-${key}-c-${i}-g-${j}`] = {
                        marginRight: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.mt-layout-${key}-c-${i}-g-${j}`] = {
                        marginTop: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.mb-layout-${key}-c-${i}-g-${j}`] = {
                        marginBottom: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.mx-layout-${key}-c-${i}-g-${j}`] = {
                        marginLeft: (value.c * i + value.g * j) + 'px',
                        marginRight: (value.c * i + value.g * j) + 'px',
                    };

                    layoutObject[`.my-layout-${key}-c-${i}-g-${j}`] = {
                        marginTop: (value.c * i + value.g * j) + 'px',
                        marginBottom: (value.c * i + value.g * j) + 'px',
                    };

                    // Gap grid

                    layoutObject[`.gap-layout-${key}-c-${i}-g-${j}`] = {
                        gap: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.gap-x-layout-${key}-c-${i}-g-${j}`] = {
                        columnGap: (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.gap-y-layout-${key}-c-${i}-g-${j}`] = {
                        rowGap: (value.c * i + value.g * j) + 'px'
                    };

                    // Grid content

                    layoutObject[`.p-grid-inline-${key}-c-${i}-g-${j}`] = {
                        '--grid-padding-inline': (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.max-w-grid-content-${key}-c-${i}-g-${j}`] = {
                        '--grid-content-max-width': (value.c * i + value.g * j) + 'px'
                    };

                    layoutObject[`.max-w-grid-breakout-${key}-c-${i}-g-${j}`] = {
                        '--grid-breakout-max-width': (value.c * i + value.g * j) + 'px'
                    };

                }
            }
        }


        const newUtilities = {
            // Layout basic
            '.layout-sm': {width: SM_DEVICE_WIDTH + 'px'},
            '.layout-md': {width: MD_DEVICE_WIDTH + 'px'},
            '.layout-lg': {width: LG_DEVICE_WIDTH + 'px'},
            '.layout-xl': {width: XL_DEVICE_WIDTH + 'px'},
            // '.layout-xxl': {width: XXL_DEVICE_WIDTH + 'px'},

            // Padding layout
            '.p-layout-sm': {padding: SM_PADDING + 'px'},
            '.pl-layout-sm': {paddingLeft: SM_PADDING + 'px'},
            '.pr-layout-sm': {paddingRight: SM_PADDING + 'px'},
            '.pt-layout-sm': {paddingTop: SM_PADDING + 'px'},
            '.pb-layout-sm': {paddingBottom: SM_PADDING + 'px'},
            '.px-layout-sm': {paddingLeft: SM_PADDING + 'px', paddingRight: SM_PADDING + 'px'},
            '.py-layout-sm': {paddingTop: SM_PADDING + 'px', paddingBottom: SM_PADDING + 'px'},

            '.p-layout-md': {padding: MD_PADDING + 'px'},
            '.pl-layout-md': {paddingLeft: MD_PADDING + 'px'},
            '.pr-layout-md': {paddingRight: MD_PADDING + 'px'},
            '.pt-layout-md': {paddingTop: MD_PADDING + 'px'},
            '.pb-layout-md': {paddingBottom: MD_PADDING + 'px'},
            '.px-layout-md': {paddingLeft: MD_PADDING + 'px', paddingRight: MD_PADDING + 'px'},
            '.py-layout-md': {paddingTop: MD_PADDING + 'px', paddingBottom: MD_PADDING + 'px'},

            '.p-layout-lg': {padding: LG_PADDING + 'px'},
            '.pl-layout-lg': {paddingLeft: LG_PADDING + 'px'},
            '.pr-layout-lg': {paddingRight: LG_PADDING + 'px'},
            '.pt-layout-lg': {paddingTop: LG_PADDING + 'px'},
            '.pb-layout-lg': {paddingBottom: LG_PADDING + 'px'},
            '.px-layout-lg': {paddingLeft: LG_PADDING + 'px', paddingRight: LG_PADDING + 'px'},
            '.py-layout-lg': {paddingTop: LG_PADDING + 'px', paddingBottom: LG_PADDING + 'px'},

            '.p-layout-xl': {padding: XL_PADDING + 'px'},
            '.pl-layout-xl': {paddingLeft: XL_PADDING + 'px'},
            '.pr-layout-xl': {paddingRight: XL_PADDING + 'px'},
            '.pt-layout-xl': {paddingTop: XL_PADDING + 'px'},
            '.pb-layout-xl': {paddingBottom: XL_PADDING + 'px'},
            '.px-layout-xl': {paddingLeft: XL_PADDING + 'px', paddingRight: XL_PADDING + 'px'},
            '.py-layout-xl': {paddingTop: XL_PADDING + 'px', paddingBottom: XL_PADDING + 'px'},

            // '.p-layout-xxl': {padding: XXL_PADDING + 'px'},
            // '.pl-layout-xxl': {paddingLeft: XXL_PADDING + 'px'},
            // '.pr-layout-xxl': {paddingRight: XXL_PADDING + 'px'},
            // '.pt-layout-xxl': {paddingTop: XXL_PADDING + 'px'},
            // '.pb-layout-xxl': {paddingBottom: XXL_PADDING + 'px'},
            // '.px-layout-xxl': {paddingLeft: XXL_PADDING + 'px', paddingRight: XXL_PADDING + 'px'},
            // '.py-layout-xxl': {paddingTop: XXL_PADDING + 'px', paddingBottom: XXL_PADDING + 'px'},

            // Max width layout
            '.max-layout-sm': {maxWidth: SM_CONTENT_MAX_WIDTH + 'px'},
            '.max-layout-md': {maxWidth: MD_CONTENT_MAX_WIDTH + 'px'},
            '.max-layout-lg': {maxWidth: LG_CONTENT_MAX_WIDTH + 'px'},
            '.max-layout-xl': {maxWidth: XL_CONTENT_MAX_WIDTH + 'px'},
            // '.max-layout-xxl': {maxWidth: XXL_CONTENT_MAX_WIDTH + 'px'},

            '.max-layout-calc-sm': {maxWidth: `calc((100vw + ${SM_CONTENT_MAX_WIDTH}px) / 2)`},
            '.max-layout-calc-md': {maxWidth: `calc((100vw + ${MD_CONTENT_MAX_WIDTH}px) / 2)`},
            '.max-layout-calc-lg': {maxWidth: `calc((100vw + ${LG_CONTENT_MAX_WIDTH}px) / 2)`},
            '.max-layout-calc-xl': {maxWidth: `calc((100vw + ${XL_CONTENT_MAX_WIDTH}px) / 2)`},
            // '.max-layout-calc-xxl': {maxWidth: `calc((100vw + ${XXL_CONTENT_MAX_WIDTH}px) / 2)`},

            // Min width layout
            '.min-layout-sm': {minWidth: SM_CONTENT_MAX_WIDTH + 'px'},
            '.min-layout-md': {minWidth: MD_CONTENT_MAX_WIDTH + 'px'},
            '.min-layout-lg': {minWidth: LG_CONTENT_MAX_WIDTH + 'px'},
            '.min-layout-xl': {minWidth: XL_CONTENT_MAX_WIDTH + 'px'},
            // '.min-layout-xxl': {minWidth: XXL_CONTENT_MAX_WIDTH + 'px'},

            // Layout cols and gutters
            '.layout-sm-c': {width: SM_COLUMN_WIDTH + 'px'},
            '.layout-md-c': {width: MD_COLUMN_WIDTH + 'px'},
            '.layout-lg-c': {width: LG_COLUMN_WIDTH + 'px'},
            '.layout-xl-c': {width: XL_COLUMN_WIDTH + 'px'},
            // '.layout-xxl-c': {width: XXL_COLUMN_WIDTH + 'px'},

            '.layout-sm-g': {width: SM_GUTTER_WIDTH + 'px'},
            '.layout-md-g': {width: MD_GUTTER_WIDTH + 'px'},
            '.layout-lg-g': {width: LG_GUTTER_WIDTH + 'px'},
            '.layout-xl-g': {width: XL_GUTTER_WIDTH + 'px'},
            // '.layout-xxl-g': {width: XXL_GUTTER_WIDTH + 'px'},

            // max Layout cols and gutters
            '.max-layout-sm-c': {maxWidth: SM_COLUMN_WIDTH + 'px'},
            '.max-layout-md-c': {maxWidth: MD_COLUMN_WIDTH + 'px'},
            '.max-layout-lg-c': {maxWidth: LG_COLUMN_WIDTH + 'px'},
            '.max-layout-xl-c': {maxWidth: XL_COLUMN_WIDTH + 'px'},
            // '.max-layout-xxl-c': {maxWidth: XXL_COLUMN_WIDTH + 'px'},

            '.max-layout-sm-g': {maxWidth: SM_GUTTER_WIDTH + 'px'},
            '.max-layout-md-g': {maxWidth: MD_GUTTER_WIDTH + 'px'},
            '.max-layout-lg-g': {maxWidth: LG_GUTTER_WIDTH + 'px'},
            '.max-layout-xl-g': {maxWidth: XL_GUTTER_WIDTH + 'px'},
            // '.max-layout-xxl-g': {maxWidth: XXL_GUTTER_WIDTH + 'px'},

            // Layout cols and gutters
            '.gap-layout-sm-c': {gap: SM_COLUMN_WIDTH + 'px'},
            '.gap-layout-md-c': {gap: MD_COLUMN_WIDTH + 'px'},
            '.gap-layout-lg-c': {gap: LG_COLUMN_WIDTH + 'px'},
            '.gap-layout-xl-c': {gap: XL_COLUMN_WIDTH + 'px'},
            // '.gap-layout-xxl-c': {gap: XXL_COLUMN_WIDTH + 'px'},

            '.gap-layout-sm-g': {gap: SM_GUTTER_WIDTH + 'px'},
            '.gap-layout-md-g': {gap: MD_GUTTER_WIDTH + 'px'},
            '.gap-layout-lg-g': {gap: LG_GUTTER_WIDTH + 'px'},
            '.gap-layout-xl-g': {gap: XL_GUTTER_WIDTH + 'px'},
            // '.gap-layout-xxl-g': {gap: XXL_GUTTER_WIDTH + 'px'},

            // Grid content

            '.layout-grid-cols-content': {
                '--_grid-padding-inline': 'var(--grid-padding-inline, 1.5rem)',
                '--_grid-content-max-width': 'var(--grid-content-max-width, 886px)',
                '--_grid-breakout-max-width': 'var(--grid-breakout-max-width, 1200px)',

                '--_grid-breakout-size': 'calc((var(--_grid-breakout-max-width) - var(--_grid-content-max-width)) / 2)',
                'grid-template-columns': '[full-width-start] minmax(var(--_grid-padding-inline), 1fr) [breakout-start] minmax(0, var(--_grid-breakout-size)) [content-start] min(100% - (var(--_grid-padding-inline) * 2), var(--_grid-content-max-width)) [content-end] minmax(0, var(--_grid-breakout-size)) [breakout-end] minmax(var(--_grid-padding-inline), 1fr) [full-width-end]'
            },

            // Layout cols and gutters with max width and width variable

            ...layoutObject
        }

        addUtilities(newUtilities);

        matchUtilities({
            'p-grid-inline': (value) => ({'--grid-padding-inline': value})
        }, {values: theme('padding')})
    }
)