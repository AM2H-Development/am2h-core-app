const {InfluxDB} = require('@influxdata/influxdb-client')

const mqtt = require('mqtt')
const mqttClient  = mqtt.connect('mqtt://server-mh.fritz.box:1883')

mqttClient.on('connect', function () {
    console.log('mqtt connected');
    mqttClient.subscribe('+/storage/+/status', function (err) {
        if (err) {
            console.log('problem connecting to mqtt')
        }
    })
})

mqttClient.on('message', function (topic, message) {
    const splits = topic.split('/');
    console.log(splits.length)
    // message is Buffer
    console.log(`%s => %s`,topic.toString(),message.toString())
    //mqttClient.end()
})

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'udIsL3x--59zS1_dAcNquRWc-o-RsMRtB1xWeDBNvSWDBJdt4HVnk1tqs4KjVdi8HbT0Y1CWWy7QYjlS5FOzzQ=='
const org = 'am2h'
const bucket = 'mh'

const client = new InfluxDB({url: 'https://influx.qxf.de', token: token})

const {Point} = require('@influxdata/influxdb-client')
const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({ns: 'mh'})

const point = new Point('envsense').floatField('temperature', 23.43234543).tag("loc","livingroom").floatField('humidity', 45.23)
writeApi.writePoint(point)

writeApi
    .close()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('Finished ERROR')
    })
