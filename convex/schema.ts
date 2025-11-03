// FILE: convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    orderId: v.string(),

    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),

    shippingDetails: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),

    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        slug: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),

    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),

    paymentMethod: v.string(),
    eMoneyDetails: v.optional(
      v.object({
        eMoneyNumber: v.string(),
        eMoneyPin: v.string(),
      })
    ),

    status: v.string(),
    timestamp: v.number(),
    emailSent: v.optional(v.boolean()),
  })
    .index("by_order_id", ["orderId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),
});
