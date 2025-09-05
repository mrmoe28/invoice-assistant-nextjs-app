import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const getStripe = () => {
  return stripePromise;
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});