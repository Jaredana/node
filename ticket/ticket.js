var mongoose = require('mongoose');  
var TicketSchema = new mongoose.Schema({  
  ID: String,
  Issue: String,
  Location: String,
  Date: String,
  User_ID: String,
});
mongoose.model('Ticket', TicketSchema);

module.exports = mongoose.model('Ticket');