import mqtt from 'async-mqtt'

const {
  protocol,
  host
} = window.location

const DS_EVENTS_URL = `${protocol === 'https:' ? 'wss:' : 'ws:'}//${host}/ds-events`

class MQTT {
  constructor (URL) {
    this.client = null
    this.URL = URL

    this.subscriptions = {}
  }

  async init () {
    this.client = await mqtt.connectAsync(this.URL)
  }

  async end () {
    await this.client.end()
    this.client = null
  }

  async subscribe (topic, handler) {
    if (!this.client) {
      await this.init()
    }

    const [mqttSubscription] = await this.client.subscribe(topic, { rap: true, rh: true, qos: 1 })
    console.log(mqttSubscription)
    this.subscriptions[topic] = handler

    this.client.on('message', (topic, message) => {
      // message is Buffer
      if (this.subscriptions[topic]) {
        this.subscriptions[topic](topic, JSON.parse(message))
      }
    })
  }

  async unsubscribe (topic) {
    if (topic in this.subscriptions) {
      delete this.subscriptions[topic]
      await this.client.unsubscribe(topic)

      if (!Object.keys(this.subscriptions).length) {
        await this.end
      }
    }
  }
}

export default new MQTT(DS_EVENTS_URL)



// WEBPACK FOOTER //
// ./src/utils/mqtt.js