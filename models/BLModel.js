// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;


const BLSchema = new Schema({
    player: String,
    jersey_number: String,
    weapon: String,
}, {
    toJSON: {virtuals: true}
});

BLSchema.virtual("_links").get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}BL/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}BL/`
            }
        }

    }
)

// Export function to create "SomeModel" model class
module.exports = mongoose.model("BL", BLSchema);