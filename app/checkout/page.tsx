"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCart } from "@/hooks/use-cart";
import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/validations";
import Image from "next/image";

import Navbar from "@/Components/layout/navbar";
import InputGroup from "@/Components/checkout/form-input"; 
import CustomRadio from "@/Components/checkout/CustomRadio";
import CashOnDeliveryMessage from "@/Components/checkout/CashOnDeliveryMessage"; 
export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { items, getSubtotal, getVAT, getShipping, getGrandTotal, clearCart } =
    useCart();
  const createOrder = useMutation(api.orders.createOrder);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { paymentMethod: "e-money" },
  });

  const paymentMethod = watch("paymentMethod");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (isSubmitting || items.length === 0) return;

    setIsSubmitting(true);

    try {
      const result = await createOrder({
        customerDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        shippingDetails: {
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          country: data.country,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totals: {
          subtotal: getSubtotal(),
          shipping: getShipping(),
          vat: getVAT(),
          grandTotal: getGrandTotal(),
        },
        paymentMethod: data.paymentMethod,
        eMoneyDetails:
          data.paymentMethod === "e-money"
            ? {
                eMoneyNumber: data.eMoneyNumber || "",
                eMoneyPin: data.eMoneyPin || "",
              }
            : undefined,
      });

      clearCart();
      router.push(`/confirmation?orderId=${result.orderId}`);
    } catch (err) {
      console.error("Checkout error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F1F1F1] min-h-screen">
        {/* Go Back Link */}
        <div className="pt-8">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
            <button
              onClick={() => router.back()}
              className="text-black/50 text-[15px] hover:text-[#D87D4A] transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px] py-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Content */}
              <div className="lg:flex-1 bg-white rounded-lg p-6 md:p-8 lg:p-12">
                <h1 className="text-[28px] md:text-[32px] font-bold tracking-[1.15px] uppercase mb-8">
                  Checkout
                </h1>

                {/* Billing Details */}
                <div className="mb-10">
                  <h2 className="text-[13px] font-bold text-[#D87D4A] tracking-[0.93px] uppercase mb-4">
                    Billing Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
                    <InputGroup
                      name="name"
                      label="Name"
                      placeholder="Alexei Ward"
                      register={register}
                      error={errors.name?.message}
                    />
                    <InputGroup
                      name="email"
                      label="Email Address"
                      placeholder="alexei@mail.com"
                      register={register}
                      error={errors.email?.message}
                    />
                    <InputGroup
                      name="phone"
                      label="Phone Number"
                      placeholder="+1 202-555-0136"
                      register={register}
                      error={errors.phone?.message}
                    />
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mb-10">
                  <h2 className="text-[13px] font-bold text-[#D87D4A] tracking-[0.93px] uppercase mb-4">
                    Shipping Info
                  </h2>
                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
                    {/* Address - Full width */}
                    <div className="md:col-span-2">
                      <InputGroup
                        name="address"
                        label="Address"
                        placeholder="1137 Williams Avenue"
                        register={register}
                        error={errors.address?.message}
                      />
                    </div>

                    <InputGroup
                      name="zipCode"
                      label="ZIP Code"
                      placeholder="10001"
                      register={register}
                      error={errors.zipCode?.message}
                    />
                    <InputGroup
                      name="city"
                      label="City"
                      placeholder="New York"
                      register={register}
                      error={errors.city?.message}
                    />
                    <InputGroup
                      name="country"
                      label="Country"
                      placeholder="United States"
                      register={register}
                      error={errors.country?.message}
                    />
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="text-[13px] font-bold text-[#D87D4A] tracking-[0.93px] uppercase mb-4">
                    Payment Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
                    <span className="text-[12px] font-bold uppercase pt-3 md:col-span-1">
                      Payment Method
                    </span>

                    <div className="md:col-span-1 flex flex-col gap-4">
                      {/* E-Money Radio */}
                      <CustomRadio
                        name="paymentMethod"
                        value="e-money"
                        label="e-Money"
                        currentValue={paymentMethod}
                        register={register}
                      />
                      {/* Cash on Delivery Radio */}
                      <CustomRadio
                        name="paymentMethod"
                        value="cash-on-delivery"
                        label="Cash on Delivery"
                        currentValue={paymentMethod}
                        register={register}
                      />
                    </div>
                  </div>

                  {/* Conditional E-Money Fields */}
                  {paymentMethod === "e-money" && (
                    <div className="grid md:grid-cols-2 gap-x-4 gap-y-6 mt-6">
                      <InputGroup
                        name="eMoneyNumber"
                        label="e-Money Number"
                        placeholder="238521993"
                        register={register}
                        error={errors.eMoneyNumber?.message}
                      />
                      <InputGroup
                        name="eMoneyPin"
                        label="e-Money PIN"
                        placeholder="6891"
                        type="password"
                        register={register}
                        error={errors.eMoneyPin?.message}
                      />
                    </div>
                  )}

                  {/* Conditional Cash on Delivery Message */}
                  {paymentMethod === "cash-on-delivery" && (
                    <CashOnDeliveryMessage />
                  )}

                  {/* General Payment Method Error */}
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-xs mt-4">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary (Right) */}
              <div className="lg:w-[350px] bg-white rounded-lg p-8 h-fit">
                <h2 className="text-[18px] font-bold uppercase mb-8">
                  Summary
                </h2>

                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg bg-[#F1F1F1]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold truncate">
                          {item.name.split(" ")[0]}
                        </h3>
                        <p className="text-[14px] text-black/50 font-bold">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-[15px] text-black/50 font-bold">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-8">
                  <div className="flex justify-between">
                    <span className="text-[15px] text-black/50 uppercase">
                      Total
                    </span>
                    <span className="text-[18px] font-bold">
                      {formatPrice(getSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[15px] text-black/50 uppercase">
                      Shipping
                    </span>
                    <span className="text-[18px] font-bold">
                      {formatPrice(getShipping())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[15px] text-black/50 uppercase">
                      VAT (Included)
                    </span>
                    <span className="text-[18px] font-bold">
                      {formatPrice(getVAT())}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-[15px] text-black/50 uppercase">
                      Grand Total
                    </span>
                    <span className="text-[18px] font-bold text-[#D87D4A]">
                      {formatPrice(getGrandTotal())}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold py-4 uppercase tracking-[1px] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Continue & Pay"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
