exports.handleWebhookEvents = (req, res) => {
  switch (req.method) {
    case 'GET': {
      if (req.query['hub.mode'] === 'subscribe') {
        if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
          res.status(200).send({
            'hub.challenge': req.query['hub.challenge']
          })
        } else {
          res.status(403).send({
            statusCode: 403,
            statusMessage: 'Forbidden'
          })
        }
      } else {
        res.status(200).send('<h1>Strava Webhook Application</h1>')
      }
      break
    }
    case 'POST': {
      if (req.body.subscription_id === process.env.SUBSCRIPTION_ID) {
         console.log('EVENT_RECEIVED: %s', JSON.stringify(req.body))
         res.status(200).end()
      } else {
        res.status(403).send({
          statusCode: 403,
          statusMessage: 'Forbidden'
        })
      }
      break
    }
    default:
      res.status(405).send({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
}
