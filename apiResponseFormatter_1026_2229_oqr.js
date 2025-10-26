// 代码生成时间: 2025-10-26 22:29:22
const axios = require('axios'); // 引入axios库进行HTTP请求
const { createHash } = require('crypto'); // 用于生成签名

/**
 * API响应格式化工具
 * @class ApiResponseFormatter
 */
class ApiResponseFormatter {

  constructor(apiUrl, apiKey) {
    // 保存API的基本URL和密钥
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * 发送请求并格式化API响应
   * @param {string} endpoint API端点
   * @param {Object} params 请求参数
   * @returns {Promise<Object>} 格式化后的响应对象
   */
  async fetchAndFormat(endpoint, params) {
    try {
      // 构建请求URL
      const url = `${this.apiUrl}/${endpoint}?apiKey=${this.apiKey}&params=${encodeURIComponent(JSON.stringify(params))}`;

      // 发送请求并获取响应
      const response = await axios.get(url);

      // 验证响应状态
      if (response.status === 200) {
        // 格式化响应数据
        const formattedData = this.formatResponse(response.data);
        return formattedData;
      } else {
        // 处理非200状态码
        throw new Error(`API request failed with status: ${response.status}`);
      }
    } catch (error) {
      // 错误处理
      console.error('Error fetching and formatting API response:', error.message);
      throw error;
    }
  }

  /**
   * 格式化API响应数据
   * @param {Object} rawData API原始响应数据
   * @returns {Object} 格式化后的数据
   */
  formatResponse(rawData) {
    // 根据实际API响应结构进行格式化
    // 这里是一个示例，需要根据实际API响应进行调整
    return {
      success: rawData.success,
      data: rawData.data,
      message: rawData.message,
      // 添加签名验证
      signature: this.generateSignature(rawData)
    };
  }

  /**
   * 生成签名
   * @param {Object} data 需要签名的数据对象
   * @returns {string} 签名字符串
   */
  generateSignature(data) {
    // 将数据对象转换为字符串
    const dataStr = JSON.stringify(data);
    // 使用HMAC-SHA256算法生成签名
    return createHash('sha256')
      .update(dataStr)
      .digest('hex');
  }
}

module.exports = ApiResponseFormatter; // 导出模块