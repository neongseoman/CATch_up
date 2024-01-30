import React from 'react';

const StreamerList = ({ streamers }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'red';
      case 2:
        return 'blue';
      case 3:
        return 'purple';
      default:
        return 'black';
    }
  };

  return (
    <div style={{ borderRight: '2px solid #33333C', width: '100%', height: '100%', backgroundColor: 'black', color: 'white', overflowY: 'scroll' }}>
      <style>
        {`
          /* 숨겨진 스크롤바 스타일 */
          ::-webkit-scrollbar {
            width: 0.5em;
            height: 0.5em;
          }

          ::-webkit-scrollbar-thumb {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `}
      </style>
      <h2 style={{ width: '100%', textAlign: 'center', color: '#fff', marginTop: '15px', marginBottom: '15px' }}>팔로우중인 스트리머</h2>
      <ul>
        {streamers.map((streamer, index) => (
          <li key={index} style={{ width: '100%' }}>
            <div style={{ paddingBottom: '5px', paddingTop: '5px', display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  marginLeft: '10px',
                  marginRight: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '100%',
                  background: `url(${streamer.profileImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  clipPath: 'circle(50%)',
                }}
              ></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', paddingleft: '20px' }}>
                  <h3 style={{ color: '#fff', marginRight: '20px' }}>{streamer.streamerName}</h3>
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(streamer.status),
                    }}
                  ></div>
                </div>
                <p>{streamer.position}</p>
              </div>
            </div>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamerList;
