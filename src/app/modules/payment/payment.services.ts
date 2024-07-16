import Stripe from 'stripe';
import config from '../../config';
const stripe = new Stripe(config.stripe_secret_key as string);

const paymentGenerate = async (amount: number, currency: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent;
};

export const paymentServices = {
  paymentGenerate,
};
