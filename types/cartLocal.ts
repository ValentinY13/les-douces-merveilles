import type {DirectusFiles} from "~/types/index";

export interface CartItemLocal {
    id: number;
    name: string;
    price: number;
    quantity: number;
    number_pieces: number;
    preview_image: DirectusFiles
}