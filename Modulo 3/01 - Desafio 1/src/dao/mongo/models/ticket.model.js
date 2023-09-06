const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchaser_datetime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

const Ticket = mongoose.model('ticket', TicketSchema);

module.exports = Ticket;