// 代码生成时间: 2025-10-06 03:45:20
// 引入必要的Gatsby组件和API
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Player, BigPlayButton, LoadingSpinner } from '@videojs/react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// 定义播放器组件
const StreamingMediaPlayer = ({ videoSrc }) => {
  // 使用useState钩子创建视频播放器实例和加载状态
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 使用useEffect钩子处理播放器的加载和卸载
  useEffect(() => {
    // 初始化播放器实例
    const initializePlayer = () => {
      setPlayer(
        videojs('video-player', {
          controls: true,
          bigPlayButton: false,
          loadingSpinner: false,
        })
      );
    };

    // 播放器加载完成后，设置加载状态为false
    player?.on('loadedmetadata', () => setIsLoading(false));

    // 组件卸载时，销毁播放器实例
    return () => {
      player?.dispose();
    };
  }, [player]);

  // 处理播放器错误
  useEffect(() => {
    if (player) {
      player.on('error', (event) => {
        console.error('播放器错误:', event);
        setIsLoading(false);
      });
    }
  }, [player]);

  // 渲染播放器组件
  return (
    <div data-testid="streaming-media-player">
      <Player
        ref={(el) => { el && setPlayer(el.player); }}
        poster="https://example.com/poster.jpg"
        className="video-js vjs-big-play-centered"
      >
        <source src={videoSrc} type="video/mp4" />
        <BigPlayButton position="center" />
        <LoadingSpinner />
      </Player>
      {isLoading && <p>视频加载中...</p>}
    </div>
  );
};

// 定义组件的props类型
StreamingMediaPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
};

// 导出播放器组件
export default StreamingMediaPlayer;
