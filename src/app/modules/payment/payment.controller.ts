import { catchAsync } from '../../utils/catchAsync';
import { paymentServices } from './payment.services';

const paymentLink = catchAsync(async (req, res, next) => {
  const { amount, currency } = req.body;
  console.log(req.body);

  const result = await paymentServices.paymentGenerate(amount, currency);

  res.status(200).send({
    clientSecret: result.client_secret,
  });
});

export const paymentController = {
  paymentLink,
};
