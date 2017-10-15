# WatchMonUdpListener
WatchMon UDP Binary Listener translates to JSON and stores to influxdb

The listener is a simple tool that should be able to run on most system. Its currently tested on Raspberry PI with latest NodeJs.

Set it up: 
The software will run as is when you have cloned the repo. But for it to be able to send any data anywhere you need to configure it.

Start with copying the batrium_config.json_dist to batrium_config.json
Example code in linux: cp batrium_config.json_dist batrium_config.json
Edit the file to suit your needs. In the file you have 4 tags for each message:
* MQTT -> Here you enable or disable if you want a message to be sent to your MQTT brooker
* Influx -> Enable or disable to send the message to Influx DB. Its not recommended to send more than needed!
* tag -> Its possible to add tagging to Influx db. Currently run it as is unless you want something special
* series -> If you want to split out data for instance slow running data from the fast running for easier query in the database this is what you use

The configuration also holds ip/dns for the MQTT brooker and Influx. If you have them on localhost you can leave it as is. For the Grafana Raspberry PI ISO nothing have to be changed

You run it with just typing:
node batrium

If all goes well it will start to show that it parsers data. 
Its also possible to have it autostarting. Example file is included in the systemd folder. Installing this file is just a matter of copying the file to your systemd folder and enable it. 
<- More info to be added about the systemd ->

<- Need to add some images of how it look ->
<- need to add links and details on how to use the data in grafana and in influx. perhaps link to the grafana page i have? ->
