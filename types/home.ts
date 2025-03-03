import type {BlockHeader, BlockSlider, BlockCitation} from '~/types'

export interface HomeData {
    id: number;
    blocks: {
        block_header: BlockHeader;
        block_slider: BlockSlider[];
        block_citation: BlockCitation;
    }
}