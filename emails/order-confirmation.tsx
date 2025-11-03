import * as React from "react";
import Image from "next/image";

// Define the shape of a single item in the email
interface EmailOrderItem {
  name: string;
  quantity: number;
  price: number;
  imageSrc: string; // URL for the image
}

// Define the props for the entire confirmation email
interface OrderConfirmationProps {
  orderId: string;
  orderDate: string; // e.g., "October 26, 2025"
  totalAmount: number;
  shippingAddress: string;
  items: EmailOrderItem[];
}

// Helper function for currency formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const OrderConfirmationEmail: React.FC<OrderConfirmationProps> = ({
  orderId,
  orderDate,
  totalAmount,
  shippingAddress,
  items,
}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation - Audiophile</title>
    </head>
    <body
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "20px 0",
      }}
    >
      <center>
        {/* Main Container */}
        <table
          width="600"
          cellPadding="0"
          cellSpacing="0"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            borderCollapse: "collapse",
          }}
        >
          {/* Header Section */}
          <tr>
            <td
              align="center"
              style={{ backgroundColor: "#191919", padding: "20px" }}
            >
              <h1 style={{ color: "#fff", margin: 0, fontSize: "28px" }}>
                AUDIOPHILE
              </h1>
            </td>
          </tr>

          {/* Body Content */}
          <tr>
            <td style={{ padding: "40px 30px" }}>
              <h2 style={{ color: "#D87D4A", fontSize: "24px", marginTop: 0 }}>
                Thanks for your order!
              </h2>

              <p
                style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}
              >
                Your order **#{orderId}** placed on **{orderDate}** has been
                confirmed. Were busy preparing it for shipment!
              </p>

              {/* Order Details Table */}
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  margin: "30px 0",
                  border: "1px solid #e0e0e0",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      style={{
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      Order Summary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "15px 10px",
                          borderBottom: "1px solid #eeeeee",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src={item.imageSrc}
                            alt={item.name}
                            width="50"
                            height="50"
                            style={{ marginRight: "15px", borderRadius: "4px" }}
                          />
                          <div>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: "#333",
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "14px",
                                color: "#888",
                              }}
                            >
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        align="right"
                        style={{
                          padding: "15px 10px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#D87D4A",
                          borderBottom: "1px solid #eeeeee",
                        }}
                      >
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr>
                    <td
                      style={{
                        padding: "15px 10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ORDER TOTAL:
                    </td>
                    <td
                      align="right"
                      style={{
                        padding: "15px 10px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#191919",
                      }}
                    >
                      {formatCurrency(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Shipping Information */}
              <h3
                style={{
                  fontSize: "18px",
                  color: "#191919",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "10px",
                }}
              >
                Shipping To
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#333",
                  whiteSpace: "pre-wrap",
                }}
              >
                {shippingAddress}
              </p>
            </td>
          </tr>

          {/* Footer Section */}
          <tr>
            <td
              align="center"
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                fontSize: "14px",
                color: "#888",
              }}
            >
              <p style={{ margin: "5px 0" }}>
                &copy; {new Date().getFullYear()} Audiophile. All rights
                reserved.
              </p>
              <p style={{ margin: "5px 0" }}>Thank you for shopping with us!</p>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
);

// Optional: Provide a default export for convenience if using standard imports
export default OrderConfirmationEmail;
