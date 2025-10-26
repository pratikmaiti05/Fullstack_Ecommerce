const amqplib=require('amqplib');
let channel,connection;
async function connect() {
  if(connection) return connection;
  try {
    connection=await amqplib.connect(process.env.RABBITMQ_URL);
    console.log('connected to RabbitmQ');
    channel=await connection.createChannel();
  } catch (error) {
    console.log(error);
  }
}
async function publishToQueue(queueName,data={}) {
  if(!channel||!connect) await connect();
  await channel.assertQueue(queueName,{durable:true});
  channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)))
  console.log(`Message Sent to queue:`,queueName,data);
}
async function subscribeToQueue(queueName,callback) {
  if(!channel||!connect) await connect();
  await channel.assertQueue(queueName,{durable:true});
  channel.consume(queueName,async (msg)=>{
    if(msg!=null){
      const data=JSON.parse(msg.content.toString());
      await callback(data);
      channel.ack(msg);
    }
  })
}
module.exports={
  connect,channel,connection,publishToQueue,subscribeToQueue
}
