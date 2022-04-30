import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const playbackTimeKey = 'videoplayer-current-time';
const valuePlaybackTime = localStorage.getItem(playbackTimeKey);

if (playbackTimeKey) {
    player.setCurrentTime(valuePlaybackTime);
};

player.on('timeupdate', throttle(data => {
    localStorage.setItem(playbackTimeKey, data.seconds);
}, 1000)
);
