import React from 'react';
import { Link } from 'react-router-dom';
import MyWaveform from '../Waveform/Waveform';

import { Row, Col } from 'react-bootstrap';

const StreamIndexItem = ({ track, queue, receiveCurrentTrack, togglePlay, currentTrack, width, parent }) => {
//   if (!track.peaks) {
//     return (<div></div>);
//   }

  const handleClick = () => {
    if (currentTrack) {
      togglePlay();
    } else {
      receiveCurrentTrack(track, queue);
    }
  };

  const togglePlayButton = (currentTrack && currentTrack.playing) ? (
    <i className="fa fa-pause" aria-hidden="true"/>
  ) : (
    <i className="fa fa-play" aria-hidden="true"/>
  );

  return (
    <Row className={!parent ? "mt-2" : ''}>
        <Col xs={4} sm={2} md={4} lg={4} xl={3} xxl={2} style={parent ? { padding: 0 } : {} }>
            <Link to={`tracks/${track.id}`}>
                <div className={'trackContainer'}>
                    <div className="trackSubContainer">
                        <img className='trackImg' src={track.track_pic}/>
                    </div>
                </div>
            </Link>
        </Col>
        <Col xs={8} sm={10} md={8} lg={8} xl={9} xxl={10}>
            <Row>
                <Col xs={3} sm={1} md={1} style={{ padding: 0 }}>
                    <div className="small-play" onClick={ handleClick }>
                        {togglePlayButton}
                    </div>
                </Col>
                <Col xs={9} sm={11} md={11}>
                    <div className="block-track">
                        <h6 className="mb-0 opc-70 uppercase">{track.track_display_name}</h6>
                        <span>{track.artist}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <a onClick={ handleClick }>
                        <MyWaveform track={ track } width={width ? width : "500" } />
                    </a>
                </Col>
            </Row>
        </Col>
    </Row>
  );
};

export default StreamIndexItem;