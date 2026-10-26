import type {
    HyperinventoryTemporaryCartResponseDto,
    HyperinventoryUserCartDetailDto,
} from "@/types/dto/hyperinventory/cart.dto";
import type { CartModel } from "@/types/models/cart.model";

function toNumber(value: string | number | undefined) {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function mapTemporaryCart(cart: HyperinventoryTemporaryCartResponseDto): CartModel {
    return {
        id: cart.temporary_cart_id,
        items: cart.items.map((item) => ({
            productId: item.product_id,
            name: item.product.name,
            sku: item.product.sku,
            slug: item.product.url_path ?? "",
            brand: item.product.brand ?? "",
            imageUrl: item.product.featured_images?.[0]?.url ?? "",
            price: toNumber(item.unit_price || item.selling_price || item.product.selling_price),
            mrp: toNumber(item.product.mrp),
            quantity: item.quantity,
        })),
        totalItems: cart.totals.total_items,
        totalQuantity: cart.totals.total_quantity,
        subtotal: toNumber(cart.totals.subtotal),
        discountedSubtotal: toNumber(cart.totals.discounted_subtotal || cart.totals.subtotal),
    };
}

/** The signed-in cart, mapped onto the same model the cart page already renders. */
export function mapUserCart(cart: HyperinventoryUserCartDetailDto): CartModel {
    const items = (cart.cart_items ?? []).map((item) => {
        const product = item.product ?? { id: "" };

        return {
            itemId: item.id,
            productId: product.id,
            name: product.display_name || product.name || "",
            sku: product.sku ?? "",
            slug: product.url_path ?? "",
            brand: "",
            imageUrl: product.featured_images?.[0]?.url ?? "",
            price: toNumber(item.price ?? product.selling_price),
            mrp: toNumber(product.mrp),
            quantity: Number(item.quantity) || 0,
        };
    });

    const subtotal = toNumber(cart.subtotal);

    return {
        id: cart.id,
        items,
        totalItems: items.length,
        totalQuantity: Number(cart.total_items) || items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        discountedSubtotal: toNumber(cart.cart_total ?? subtotal),
    };
}
