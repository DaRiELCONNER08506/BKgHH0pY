// 代码生成时间: 2025-10-24 18:03:43
const _ = require('lodash');

/**
 * 推荐系统算法
 *
 * 这个算法使用简单的协同过滤方法来推荐项目给用户。
 *
 * @param {Array} users - 用户数组，每个用户有他们喜欢的电影ID列表
 * @param {Array} movies - 电影数组，每个电影有它的ID和标题
 * @param {number} numRecommendations - 每个用户应该接收到的电影推荐数量
 */
function recommendMovies(users, movies, numRecommendations) {
  // 检查输入参数
  if (!Array.isArray(users) || !Array.isArray(movies) || typeof numRecommendations !== 'number') {
    throw new Error('Invalid input parameters');
  }

  // 创建一个电影映射，以便快速查找电影标题
  const movieMap = _.keyBy(movies, 'id');

  // 计算所有用户对每部电影的评分（这里简单地使用喜欢的电影数量作为评分）
  const movieRatings = movies.map(movie => ({
    id: movie.id,
    ratings: users.reduce((count, user) => {
      if (user.likes.includes(movie.id)) {
        return count + 1;
      }
      return count;
    }, 0)
  }));

  // 为每个用户推荐电影
  const recommendations = users.map(user => {
    // 找出用户已经喜欢的电影
    const likedMovies = user.likes.map(like => movieMap[like]);
    // 排除已经喜欢的电影
    const candidateMovies = movieRatings.filter(movie => !user.likes.includes(movie.id));
    // 根据用户评分排序
    const sortedMovies = _.orderBy(candidateMovies, ['ratings'], ['desc']);
    // 返回前numRecommendations个推荐
    return sortedMovies.slice(0, numRecommendations);
  });

  return recommendations;
}

// 示例用户和电影数据
const users = [
  { id: 1, likes: [1, 2] },
  { id: 2, likes: [2, 3] },
  { id: 3, likes: [1, 3] }
];

const movies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' }
];

// 获取每个用户的3个推荐
const numRecommendations = 3;
const recommendations = recommendMovies(users, movies, numRecommendations);

// 输出推荐结果
console.log(recommendations);
