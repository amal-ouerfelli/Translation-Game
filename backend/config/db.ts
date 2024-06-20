const mongoose = require("mongoose");
const dbMadbox ="mongodb+srv://Madbox:oWDPOCikzthDyAYv@madbox.sh9jxao.mongodb.net/"

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

const dbConnection = mongoose.connect(dbMadbox, options)
.then(res => {
  if(res){
      console.log(`Database connection succeffully to database`)
  }
  
}).catch(err => {
  console.log(err)
})


export default dbConnection
