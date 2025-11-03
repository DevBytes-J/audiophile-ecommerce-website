import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

// Initialize Resend Client
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to generate HTML (Unchanged logic)
const generateOrderHtml = (
  orderId: string,
  items: { name: string; price: number; quantity: number }[],
  grandTotal: number
): string => {
  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; color: #333;">${item.name}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; color: #555;">$${item.price.toFixed(0)}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; color: #555;">x${item.quantity}</td>
    </tr>
  `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
      <h1 style="color: #D87D4A; text-align: center;">Order Confirmed!</h1>
      <p style="text-align: center;">Thank you for your purchase. Your order details are below:</p>
      
      <div style="padding: 15px; background-color: #f9f9f9; border-radius: 4px; margin-bottom: 20px;">
        <p style="font-weight: bold; margin: 0;">Order ID: ${orderId}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <thead>
          <tr style="background-color: #e8e8e8;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Qty</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
        <tfoot>
            <tr>
              <td colspan="2" style="padding: 15px 0 0; text-align: right; font-weight: bold; font-size: 16px;">GRAND TOTAL</td>
              <td style="padding: 15px 0 0; text-align: right; font-weight: bold; font-size: 16px; color: #D87D4A;">$${grandTotal.toFixed(0)}</td>
            </tr>
        </tfoot>
      </table>

      <p style="margin-top: 40px; color: #888; text-align: center; font-size: 12px;">This is a test email sent via Resend's development sender.</p>
    </div>
  `;
};

/**
 * Sends a transactional order confirmation email using Resend.
 * This is an ACTION, the preferred method for side effects like external API calls.
 */
export const sendOrderConfirmation = action({
  args: {
    customerEmail: v.string(),
    orderId: v.string(),
    items: v.array(
      v.object({ name: v.string(), price: v.number(), quantity: v.number() })
    ),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    // 🛑 DEBUG CHECK: If the key isn't loaded, this logs a clear error.
    if (!process.env.RESEND_API_KEY) {
      console.error("DEBUG: RESEND_API_KEY IS NOT LOADED.");
      return { success: false, error: "API Key is missing from ENV." };
    }

    // ⚠️ Use the verified test sender
    const FROM_EMAIL = "Audiophile Store <onboarding@resend.dev>";

    const htmlContent = generateOrderHtml(
      args.orderId,
      args.items,
      args.grandTotal
    );

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [args.customerEmail],
        subject: `Order Confirmation #${args.orderId} - Audiophile Store`,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return { success: false, error: `Resend Error: ${error.message}` };
      }

      console.log("Email sent successfully:", data);
      return { success: true, id: data?.id };
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred during email dispatch.";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        errorMessage = err.message;
      }

      console.error("Email Dispatch Error:", err);

      return {
        success: false,
        error: `Unable to dispatch email: ${errorMessage}`,
      };
    }
  },
});
