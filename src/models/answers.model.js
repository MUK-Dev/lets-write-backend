const mongoose = require("mongoose");
// answers-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "answers";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      user: {
        user_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
        username: { type: String, required: true },
        avatar: { type: String, required: true },
        email: { type: String, required: true },
      },
      room: {
        room_id: { type: mongoose.Types.ObjectId, required: true, ref: "Room" },
        room_owner_email: { type: String, required: true },
        question: { type: String, required: true },
      },
      grade: { type: String, default: undefined },
      text: { type: Object, required: true },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
