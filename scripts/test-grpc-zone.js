
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../src/proto/zone.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const zoneProto = grpc.loadPackageDefinition(packageDefinition).zone;

const client = new zoneProto.ZoneService('localhost:9897', grpc.credentials.createInsecure());

console.log('Testing gRPC server connection...');

client.FindAll({}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! Response:', JSON.stringify(response, null, 2));
  }
});
