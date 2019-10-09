const commentModel = {
  id: null,
  emoji: ``,
  text: ``,
  author: ``,
  daysAgo: 0,
  emojiName: ``
};

export const getCommentModel = () => ({...commentModel});

export const parseComments = (comments) => {
  const parsedComments = [];

  comments.forEach((mockComment) => {
    const newComment = getCommentModel();

    newComment.id = parseInt(mockComment.id, 10);
    newComment.author = mockComment.author;
    newComment.text = mockComment.comment;
    newComment.daysAgo = mockComment.date;
    newComment.emoji = `./images/emoji/${mockComment.emotion}.png`;
    newComment.emojiName = `${mockComment.emotion}`;

    parsedComments.push(newComment);
  });

  return parsedComments;
};

export const commentToRaw = (comment) => {
  const newComment = {
    emotion: ``,
    comment: ``,
    date: `2019-09-29T04:43:39.441Z`
  };

  // newComment.id = `${comment.id}`;
  // newComment.author = comment.author;
  newComment.comment = comment.text;
  newComment.date = new Date(comment.daysAgo).toISOString();
  newComment.emotion = `angry`;

  return newComment;
};
