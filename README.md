# WatchMonUdpListener

WatchMon UDP Binary Listener translates to JSON and stores to influxdb or sends it to MQTT

## Getting Started
```
git clone https://github.com/Batrium/WatchMonUdpListener
```
or
```
npm install watchmonudplistener
```
or

Download premade Raspberry PI 3 ISO with everything built in:
http://diytechandrepairs.nu/raspberry-solar/


### Prerequisites

MQTT
Binary-Parser
Influx

How to install them: (If you clone from GitHub)
```
npm install mqtt
npm install binary-parser
npm install influx
```

### Installing

Main install in "Get started"

Start with copying the batrium_config.json_dist to batrium_config.json

Example code in linux: 
```
cp config.json_dist config.json
```

Edit the file to suit your needs. 
In the file you have 4 tags for each message:

* mqtt-> Here you enable or disable if you want a message to be sent to your MQTT brooker

* Influx -> Enable or disable to send the message to Influx DB. Its not recommended to send more than needed!

* tag -> Its possible to add tagging to Influx db. Currently run it as is unless you want something special

* series -> If you want to split out data for instance slow running data from the fast running for easier query in the database this is what you use

The configuration also holds ip/dns for the MQTT brooker and Influx. 
If you have them on localhost you can leave it as is. 

Example config for main setup:
```
 	"config" : {
                "mqtthost" : "localhost",
                "influxhost" : "localhost",
                "influxdatabase" : "batrium"
        },
```
Example config for a message:
   ```
    "3e5a" : {
                "mqtt" : true,
                "influx" : true,
                "tag" : "general",
                "serie" : "generic"
        },
```
When you have cloned the git repo and setup the configuration in the configuration files you also need to prepare
the database. In the config section you define the influxdatabase and that one need to be created in InfluxDB

Run:
```
influxdb
```
then you run: (Change to the database you want to use)
```
create database batrium 
```

When all this is done its just a matter of running the application

## Automatic startup

```
cp systemctl/batrium.service /etc/systemd/system/
```
Be sure to update paths in the file acordingly to where you installed the Batrium UDP listener

```
systemctl --system daemon-reload
```

To enable:
```
systemctl enable batrium.service
```
To disable
```
systemctl disable batrium.service
```
## Contributing

For contributing to this project you can support Batrium by getting HW from them. 
Supporting the creator of this script by Patreon/Paypal/Subscribing to youtube channel.
And the most important is to report any issues/bugs or features that you want to see sorted or fixed. 
All added contributions are much appreciated!


## Authors

* **Daniel Römer** - *Initial work* - [daromer2](https://github.com/daromer2)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
