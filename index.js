exports.handleWebhookEvents = (req, res) => {
  switch (req.method) {
    case 'GET': {
      const path = req.path || '/'
      const query = req.query || {}
      if (path === '/app') {
        res.status(200).send('<h1>The Coyoyte</h1>')
      } else if (query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.status(200).send({
          'hub.challenge': query['hub.challenge']
        })
      } else {
        res.status(403).send({
          statusCode: 403,
          statusMessage: 'Forbidden'
        })
      }
      break
    }
    case 'POST': {
      const subscription_id = req.body.subscription_id
      console.log('Event', req.body)
      res.status(200).end()
      break
    }
    default:
      res.status(405).send({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
}
