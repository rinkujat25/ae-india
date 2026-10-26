import type {
    HyperinventoryOrderAddressDto,
    HyperinventoryOrderDetailDto,
    HyperinventoryOrderDto,
    HyperinventoryOrderItemDto,
} from "@/types/dto/hyperinventory/order.dto";
import type {
    OrderAddressModel,
    OrderDetailModel,
    OrderItemModel,
    OrderModel,
    OrderStatusTone,
} from "@/types/models/order.model";

/** "cancelled_by_admin" -> "Cancelled by admin" */
function humanise(value: string) {
    const text = value.replace(/[_-]+/g, " ").trim();

    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
}

const successStatuses = new Set(["delivered", "completed", "fulfilled", "paid"]);
const cancelledStatuses = new Set(["cancelled", "canceled", "failed", "returned", "refunded", "rejected"]);
const pendingStatuses = new Set([
    "pending", "processing", "confirmed", "accepted", "packed", "shipped", "in_transit", "out_for_delivery",
]);

function toneFor(status: string): OrderStatusTone {
    const key = status.toLowerCase();

    if (successStatuses.has(key)) return "success";
    if (cancelledStatuses.has(key)) return "cancelled";
    if (pendingStatuses.has(key)) return "pending";

    return "neutral";
}

function mapItem(dto: HyperinventoryOrderItemDto): OrderItemModel {
    const product = dto.product ?? {};
    const price = Number(dto.price_for_user ?? dto.price) || 0;
    const quantity = Number(dto.quantity) || 0;

    return {
        id: dto.id ?? "",
        productId: product.id ?? "",
        name: product.display_name || product.name || "",
        sku: product.sku ?? "",
        slug: product.url_path ?? "",
        imageUrl: product.featured_images?.find((image) => image?.url)?.url ?? "",
        price,
        quantity,
        lineTotal: price * quantity,
    };
}

export function mapOrderDtoToModel(dto: HyperinventoryOrderDto): OrderModel {
    const items = (dto.order_items ?? []).map(mapItem);
    const status = dto.status ?? "";

    const tone = toneFor(status);

    return {
        id: dto.id,
        orderNumber: dto.order_number ?? "",
        placedOn: dto.created_at ?? "",
        status,
        statusLabel: humanise(status) || "Unknown",
        statusTone: tone,
        actionLabel: tone === "pending" ? "Track order" : "Reorder",
        paymentStatusLabel: humanise(dto.payment_status ?? ""),
        paymentMethodLabel: humanise(dto.gateway_type ?? dto.payment_mode ?? ""),
        total: Number(dto.order_total) || 0,
        productCount: items.length,
        unitCount: items.reduce((sum, item) => sum + item.quantity, 0),
        items,
    };
}

export function mapOrderListToModels(results: HyperinventoryOrderDto[]): OrderModel[] {
    return results.filter((dto) => Boolean(dto?.id)).map(mapOrderDtoToModel);
}

/** Numbers arrive as either a number or a decimal string. */
function toAmount(value: number | string | null | undefined): number {
    return Number(value) || 0;
}

function mapAddress(dto: HyperinventoryOrderAddressDto | null | undefined): OrderAddressModel | null {
    if (!dto) return null;

    const lines = [
        dto.address_line_1,
        dto.address_line_2,
        dto.landmark,
        dto.city,
        dto.state?.name,
        dto.pincode,
    ]
        .map((part) => (part ?? "").trim())
        .filter(Boolean)
        .join(", ");

    return {
        name: (dto.display_name || dto.legal_name || "").trim(),
        lines,
        contact: (dto.contact_person_number ?? "").trim(),
        gstNumber: (dto.gst_number ?? "").trim(),
    };
}

export function mapOrderDetailToModel(dto: HyperinventoryOrderDetailDto): OrderDetailModel {
    const items = (dto.order_items ?? []).map(mapItem);
    const status = dto.status ?? "";
    const paymentStatus = dto.payment_status ?? "";
    const total = toAmount(dto.order_total);
    const pending = toAmount(dto.amount_due);

    return {
        id: dto.id,
        orderNumber: dto.order_number ?? "",
        placedOn: dto.created_at ?? "",
        status,
        statusLabel: humanise(status),
        statusTone: toneFor(status),
        paymentStatusLabel: humanise(paymentStatus),
        paymentMethodLabel: dto.payment_method?.name ?? "",
        paidOn: dto.payment_detail?.created_at ?? "",
        subtotal: toAmount(dto.subtotal),
        gst: toAmount(dto.gst_amount),
        shipping: toAmount(dto.shipping_charges),
        additionalCharges: toAmount(dto.additional_charges) + toAmount(dto.payment_method_charges),
        discount: toAmount(dto.additional_discount),
        total,
        // The provider reports what is still owed, not what has been paid.
        paidAmount: Math.max(total - pending, 0),
        pendingAmount: pending,
        itemCount: Number(dto.total_items) || items.reduce((sum, item) => sum + item.quantity, 0),
        items,
        shippingAddress: mapAddress(dto.shipping_address),
        billingAddress: mapAddress(dto.billing_address),
    };
}
