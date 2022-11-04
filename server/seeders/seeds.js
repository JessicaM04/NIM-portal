const faker = require('faker');

const db = require('../config/connection');
const { Comment, User } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});

  // create user data
  const donorData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.donorName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    donorData.push({ username, email, password });
  }

  const createdDonors = await Donor.collection.insertMany(donorData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
    const { _id: donorId } = createdDonors.ops[randomUserIndex];

    let friendId = donorId;

    while (friendId === donorId) {
      const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
      friendId = createdDonors.ops[randomUserIndex];
    }

    await Donor.updateOne({ _id: donorId }, { $addToSet: { friends: friendId } });
  }

  // create comments
  let createdComments = [];
  for (let i = 0; i < 100; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
    const { username, _id: donorId } = createdDonors.ops[randomDonorIndex];

    const createdComment= await Comment.create({ commentText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdCommentt._id } }
    );

    createdComments.push(createdComment);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomDonorIndex = Math.floor(Math.random() * createdDonors.ops.length);
    const { username } = createdDonors.ops[randomDonorIndex];

    const randomCommentIndex = Math.floor(Math.random() * createdComments.length);
    const { _id: commentId } = createdComments[randomCommentIndex];

    await Comment.updateOne(
      { _id: commentId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});