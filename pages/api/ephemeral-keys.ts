import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ephemeralKeySecret: string
}

const stripe = require('stripe')('sk_test_Zbi06DLYODWXoEsQ0QTSIfRA');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cardId, nonce } = JSON.parse(req.body);

  const ephemeralKey = await stripe.ephemeralKeys.create({
    nonce: nonce,
    issuing_card: cardId,
  }, {
    stripeAccount: 'acct_1JjpDMQ9DTJCEgzc',
    apiVersion: '2020-03-02'
  });

  res.json({
    ephemeralKeySecret: ephemeralKey.secret,
  });
}
