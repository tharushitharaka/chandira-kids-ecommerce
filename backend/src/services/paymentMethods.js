const methods = {
  cod: {
    label: 'Cash On Delivery',
    createIntent: async (order) => ({ provider: 'cod', reference: order.orderNumber, status: 'pending' })
  },
  stripe: {
    label: 'Stripe',
    createIntent: async (order) => ({
      provider: 'stripe',
      configured: Boolean(process.env.STRIPE_SECRET_KEY),
      reference: `stripe_${order.orderNumber}`,
      status: 'requires_payment_method'
    })
  },
  paypal: {
    label: 'PayPal',
    createIntent: async (order) => ({
      provider: 'paypal',
      configured: Boolean(process.env.PAYPAL_CLIENT_ID),
      reference: `paypal_${order.orderNumber}`,
      status: 'created'
    })
  }
};

export const getPaymentMethods = () =>
  Object.entries(methods).map(([id, method]) => ({ id, label: method.label }));

export const createPaymentIntent = async (method, order) => {
  const selected = methods[method] || methods.cod;
  return selected.createIntent(order);
};
