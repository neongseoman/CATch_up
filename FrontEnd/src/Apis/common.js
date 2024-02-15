export const getKoreaTime = () => {
    const currentTimestamp = Date.now();
    return new Date(currentTimestamp).toLocaleString('en-US', {
        timeZone: 'Asia/Seoul'
    });
};
