const { Schema, model, models } = require("mongoose");

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: String, required: true },
    secure_code: { type: String },
    path: { type: String },
    giveaways: {
      type: [{ type: Schema.Types.ObjectId, ref: "giveaways" }],
      required: false,
    },

    email: {
      type: String,
      required: true,
      validate: [
        {
          async validator(value) {
            try {
              const data = await models.admins.findOne({ email: value });
              return !data;
            } catch (error) {
              message: "El administrador ya existe";
            }
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const users = model("users", usersSchema);

module.exports = users;
