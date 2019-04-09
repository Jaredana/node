var mongoose = require('mongoose');  
var TicketSchema = new mongoose.Schema({  
  ID: Number,
  Issue: String,
  Location: String,
  Date: Date,
  User_ID: String,
});
mongoose.model('Ticket', TicketSchema);

module.exports = mongoose.model('Ticket');