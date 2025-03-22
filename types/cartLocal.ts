import type {DirectusFiles, SubCategory} from "~/types/index";

export interface CartItemLocal {
    id: number;
    slug: string;
    name: string;
    price: number;
    max: number;
    quantity: number;
    number_pieces: number;
    sub_category: SubCategory;
    preview_image: DirectusFiles
}