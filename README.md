# driver-dispatch
Automatic Driver-Shipment Dispatch Application | Node.js

A basic automatic dispatch system for some shipments! Your app will be able to read from a list of shipments that need to be picked up and a list of available drivers and their locations, and hit an existing REST endpoint to dispatch these shipments to nearby drivers.
You are given the following:
- JSON file representing a list of drivers with their current locations
- driverId is the key of each JSON object (1, 2, 3...)
- JSON file representing a list of 5 active shipments and their pickup locations
- shipmentId is the key of each JSON object (65289023243, 3823958290...)

### Prerequisites

* Node.js

### Set Up Directions
In the command line, type `npm install` to download node packages. Go to package.json file to view dependencies.
Type `node index.js` to initiate application.

## Built With

* [Node.js](https://nodejs.org/en/) 

### Directory structure
```
├── drivers.json
├── index.js
├── package.json              
└── shipments.json              
```

## Developers
- Donovan Lowkeen | [GitHub](https://github.com/dlowkeen)
