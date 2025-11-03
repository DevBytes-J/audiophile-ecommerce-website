// FILE: convex/orders.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase();
    const orderId = `APH-${timestamp}-${randomStr}`;

    const order = await ctx.db.insert("orders", {
      orderId,
      customerDetails: args.customerDetails,
      shippingDetails: args.shippingDetails,
      items: args.items,
      totals: args.totals,
      paymentMethod: args.paymentMethod,
      eMoneyDetails: args.eMoneyDetails,
      status: "confirmed",
      timestamp: timestamp,
      emailSent: false,
    });

    return {
      orderId,
      id: order,
      success: true,
    };
  },
});

export const getOrderById = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("orderId", args.orderId))
      .first();

    return order;
  },
});
