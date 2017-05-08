
/**
 * Borrowed from d3-charts-dto
 * @function convertFromSeconds
 * @param  {Object} seconds
 * @return {String} formatted time
 */
export const formatSecondsToHumanised = (seconds) => {
    let second = 0;
    let minute = '';
    let hour = '';

    if (seconds < 60) {
        second = `${String(seconds)}s`;
    } else if (60 <= seconds && seconds < 3600) {
        let sec = Math.floor(seconds % 60);
        let min = Math.floor(seconds / 60);
        second = sec < 10 ? `0${sec}s` : `${sec}s`;
        minute = min < 10 ? `0${min}m` : `${min}m`;
    } else if (3600 <= seconds) {
        var minRaw = Math.floor(seconds / 60);
        var h = Math.floor(seconds / 3600);
        var min = Math.floor(minRaw % 60);
        var sec = Math.floor(seconds % 60);
        second = sec < 10 ? `0${sec}s` : `${sec}s`;
        minute = min < 10 ? `0${min}m` : `${min}m`;
        hour = h < 10 ? `0${h}h` : `${h}h`;
    }
    return hour + minute + second;
};

