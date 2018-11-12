navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_measurement'))
.then(characteristic => characteristic.startNotifications())
.then(characteristic => {
  characteristic.addEventListener('characteristicvaluechanged',
                                  handleCharacteristicValueChanged);
  console.log('Notifications have been started.');
})
.catch(error => { console.log(error); });

function handleCharacteristicValueChanged(event) {
  var value = event.target.value;
  console.log('Received ' + value);
  
}