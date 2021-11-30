import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './progress_bar';
import Controller from './controller';

class Playbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.track) {
      // this.props.recordPlay(nextProps.track.id)
    }
  }

  updateProgress () {
    this.setState({ currentTime: this.audioTag.currentTime })
  }

  playNextTrack () {
    const currentIndex = this.props.queue.findIndex(track => track.id === this.props.track.id);
    this.props.receiveCurrentTrack(this.props.queue[currentIndex + 1]);
  }

  render () {
    const track = this.props.track;
    if (!track) return (<div></div>);

    return (
      <section className="playbar">

        <audio id='audio' autoPlay preload="auto" src={track.track} type="audio/mpeg"
          ref={ (tag) => this.audioTag = tag }
          onTimeUpdate={ this.updateProgress.bind(this) }
          onEnded={ this.playNextTrack.bind(this) }
        />

        <Controller
          audio={ this.audioTag }
          playing={this.props.playing}
          togglePlay={this.props.togglePlay}
          playNextTrack={this.playNextTrack.bind(this)} />

        <ProgressBar audio={ this.audioTag }/>

        <div className="track-info">
          <img src={ track.track_pic } />
          <ul>
            <li>
              <Link to={`tracks/${track.id}`}>
                <h4>{ track.track_display_name }</h4>
              </Link>
            </li>
            <li>
              <Link to={`users/${track.id}`}>
                <p>{ track.artist }</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Playbar;
