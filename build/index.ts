const entryConfig = require('../configs')
const appRoot = require('./app')

appRoot.listen(entryConfig.port, () => {
  console.log('ClientRender is running at http://localhost:' + entryConfig.port + ',mode:' + entryConfig.env)
})
