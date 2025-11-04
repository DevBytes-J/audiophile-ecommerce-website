import { Resend } from "resend";
import { NextResponse } from "next/server";
interface OrderItem {
  name: string;
  quantity: number;
  price: number; 
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    interface RequestBody {
      customerEmail: string;
      orderId: string;
      items: OrderItem[]; 
      grandTotal: number;
    }
    const { customerEmail, orderId, items, grandTotal }: RequestBody =
      await req.json();

    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", 
      to: customerEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f1f1f1;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f1f1; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: white; border-radius: 8px; overflow: hidden;">
                    <tr>
                      <td style="background-color: #D87D4A; padding: 40px; text-align: center;">
                        <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">AUDIOPHILE</h1>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #101010;">Thank You For Your Order!</h2>
                        <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">
                          Your order has been confirmed and will be shipped soon.
                        </p>
                        
                        <div style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                          <p style="margin: 0; color: #666; font-size: 14px;">Order ID</p>
                          <p style="margin: 5px 0 0 0; color: #101010; font-size: 18px; font-weight: bold;">${orderId}</p>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #101010;">Order Summary</h3>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          ${items
                            .map(
                              // 3. The 'item' parameter is now explicitly typed as OrderItem
                              (item: OrderItem) => `
                            <tr>
                              <td style="padding: 15px 0; border-bottom: 1px solid #f1f1f1;">
                                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #101010;">${item.name}</p>
                                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Qty: ${item.quantity}</p>
                              </td>
                              <td style="padding: 15px 0; border-bottom: 1px solid #f1f1f1; text-align: right;">
                                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #101010;">$${item.price.toLocaleString()}</p>
                              </td>
                            </tr>
                          `
                            )
                            .join("")}
                        </table>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #D87D4A;">
                          <table width="100%">
                            <tr>
                              <td><p style="margin: 0; font-size: 18px; font-weight: bold; color: #101010;">GRAND TOTAL</p></td>
                              <td align="right"><p style="margin: 0; font-size: 18px; font-weight: bold; color: #D87D4A;">$${grandTotal.toLocaleString()}</p></td>
                            </tr>
                          </table>
                        </div>
                        
                        <div style="text-align: center; margin: 40px 0 20px 0;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}" 
                             style="display: inline-block; background-color: #D87D4A; color: white; text-decoration: none; padding: 15px 40px; font-size: 14px; font-weight: bold; text-transform: uppercase; border-radius: 0;">
                            Continue Shopping
                          </a>
                        </div>
                        
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f1f1f1; text-align: center;">
                          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Need help with your order?</p>
                          <p style="margin: 0; color: #D87D4A; font-size: 14px; font-weight: bold;">support@audiophile.com</p>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="background-color: #101010; padding: 30px; text-align: center;">
                        <p style="margin: 0; color: #666; font-size: 14px;">© 2024 Audiophile. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}
