const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const donorSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donor'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
donorSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
donorSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

donorSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const Donor = model('Donor', donorSchema);

module.exports = User;