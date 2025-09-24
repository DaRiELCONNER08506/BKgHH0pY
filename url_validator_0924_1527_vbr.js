// 代码生成时间: 2025-09-24 15:27:02
const axios = require('axios'); // 引入axios库用于HTTP请求
const isValidUrl = require('is-url'); // 引入is-url库用于URL有效性验证

// 定义URL验证函数
async function validateUrl(url) {
  // 检查URL是否有效
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL provided');
  }

  try {
    // 发送HTTP HEAD请求以验证URL存在性
    const response = await axios.head(url);
    // 如果响应状态码为200，则URL有效
    if (response.status === 200) {
      return { valid: true, message: 'URL is valid and reachable' };
    } else {
      return { valid: false, message: 'URL is valid but not reachable' };
    }
  } catch (error) {
    // 捕获错误并返回URL验证结果
    if (error.response) {
      return { valid: false, message: 'URL is not reachable' };
    } else if (error.request) {
      return { valid: false, message: 'No response received' };
    } else {
      return { valid: false, message: 'Error occurred while validating URL' };
    }
  }
}

// 导出validateUrl函数
module.exports = validateUrl;