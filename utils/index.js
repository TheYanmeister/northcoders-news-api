const formatDate = input => {
  const formattedArr = [];
  input.forEach(obj => {
    const newObj = obj;
    newObj.created_at = new Date(newObj.created_at);
    formattedArr.push(newObj);
  });
  return formattedArr;
};

const createRefObj = (comments, articles) => {
  const ref = {};
  comments.forEach(comment => {
    const artIdObj = articles.find(article => {
      return article.title === comment.belongs_to;
    });
    ref[comment.belongs_to] = artIdObj.article_id;
  });
  return ref;
};

const formatComments = (comments, refObj) => {
  const formattedComments = comments;
  formattedComments.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.article_id = refObj[comment.belongs_to];
    delete comment.belongs_to;
  });
  return formattedComments;
};

module.exports = { formatDate, createRefObj, formatComments };
