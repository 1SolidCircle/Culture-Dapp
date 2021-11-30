export const RECEIVE_CURRENT_TRACK = "RECEIVE_CURRENT_TRACK";
export const TOGGLE_PLAY = "TOGGLE_PLAY";

export const receiveCurrentTrack = (track, queue) => ({
  type: RECEIVE_CURRENT_TRACK,
  track,
  queue
});

export const togglePlay = () => ({
  type: TOGGLE_PLAY
})
