import {useCartStore} from "~/store/cart";

interface CartProduct {
    product_id: number;
    quantity: number;
}

interface StockCheckResult {
    status: 'success' | 'partial' | 'error';
    unavailableIds?: number[];
    partials?: {
        id: number;
        requestedQty: number;
        availableQty: number;
    }[];
    errorMessage?: string;
}

export const useCheckStock = async function (): Promise<StockCheckResult> {
    const cartStore = useCartStore();
    const {$directus, $readItems} = useNuxtApp();

    const items = cartStore.cartStorage;
    const productsIds = items.map(item => item.product_id);

    const products = await $directus.request(
        $readItems('product', {
            fields: ['id', 'is_available', 'number_stock'],
            filter: {
                id: {_in: productsIds}
            }
        })
    );

    const unavailableIds: number[] = [];
    const partials: StockCheckResult['partials'] = [];

    for (const item of items) {
        const product = products.find(p => p.id === item.product_id);

        if (!product || !product.is_available || product.number_stock <= 0) {
            unavailableIds.push(item.product_id);
        } else if (product.number_stock < item.quantity) {
            partials.push({
                id: item.product_id,
                requestedQty: item.quantity,
                availableQty: product.number_stock
            });
        }
    }

    if (unavailableIds.length) {
        return {
            status: 'error',
            unavailableIds,
            errorMessage: 'Certains produits ne sont plus disponible'
        };
    }

    if (partials.length) {
        return {
            status: 'partial',
            partials,
            errorMessage: 'La quantité de certains articles a été ajustée selon le stock disponible.'
        };
    }

    return {
        status: 'success'
    };
};