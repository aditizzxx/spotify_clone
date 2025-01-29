import { combineReducers } from 'redux';
import { loginReducer } from './login';
import { signupDetailsReducer } from './signup';
import { deleteSongsReducer } from './deleteSong';
import { createPlaylistReducer } from './createPlaylist';
import { viewPlaylistReducer } from './viewPlaylists';
import { playlistDetailsReducer } from './playlist';
import { editPlaylistsReducer } from './editPlaylist';
import { deletePlaylistReducer } from './deletePlaylist';
import { updatePasswordReducer } from './updatePassword';
import { updateUserInfoReducer } from './updateUserInfo';
import { userDetailsReducer } from './userDetails';
import { createSongReducer } from './createSong';
import { viewSongsReducer } from './viewSongs';
import { likeSongReducer } from './likeSong';
import { dislikeSongReducer } from './dislikeSong';
import { updateSongReducer } from './updateSong';
import { playerQueueDetailsReducer } from './playerQueue';
import { songDetailsReducer } from './songs';
import { playerDetailsReducer } from './player';
import { likedPlaylistReducer } from './likedPlaylist';
import { addToPlaylistReducer } from './addToPlaylist';
import { dislikedPlaylistReducer } from './dislikedPlaylist';
import { removeFromPlaylistReducer } from './removeFromPlaylist';
import { searchSongDetailsReducer } from './searchSong';
import { searchPlaylistDetailsReducer } from './searchPlaylist';
import { searchArtistDetailsReducer } from './searchArtist';
import { becomeArtistDetailsReducer } from './becomeArtist';
import { artistDetailsReducer } from './artist';
import { followArtistDetailsReducer } from './followArtist';
import { unfollowArtistDetailsReducer } from './unfollowArtist';
import { forgotPasswordDetailsReducer } from './forgotPassword';
import { viewArtistReducer } from './viewArtist';
import { resetPasswordDetailsReducer } from './resetPassword';
import { userSubscriptionDetailsReducer } from './userSubscription';
import { instituteDetailsReducer } from './institute';
import { confirmSubscriptionDetailsReducer } from './confirmSubscription';
import { countryDetailsReducer } from './country';
import { createPlanReducer } from './createPlan';
import { viewPlanReducer } from './viewPlan';
import { editPlanReducer } from './editPlan';
import { getPlanDetailsReducer } from './getPlan';
import { deletePlanReducer } from './deletePlan';
import { userRoleDetailsReducer } from './userRoleDetails';
import { approveRequestReducer } from './approveRequest';
import { disapproveRequestReducer } from './disapproveRequest';

const rootReducer = combineReducers({
  login: loginReducer,

  signupdetails : signupDetailsReducer,
  deleteSong: deleteSongsReducer,
  createPlaylist: createPlaylistReducer,
  viewPlaylist: viewPlaylistReducer,
  getPlaylist: playlistDetailsReducer,
  editPlaylist: editPlaylistsReducer,
  deletePlaylist: deletePlaylistReducer,
  updatePassword: updatePasswordReducer,
  updateUserInfo: updateUserInfoReducer,
  userDetails: userDetailsReducer,
  createSong: createSongReducer,
  viewSongs : viewSongsReducer,
  likeSong: likeSongReducer,
  dislikeSong: dislikeSongReducer,
  updateSong: updateSongReducer,
  playerQueue: playerQueueDetailsReducer,
  song: songDetailsReducer,
  playPauseDetails: playerDetailsReducer,
  likedPlaylist: likedPlaylistReducer,
  dislikedPlaylist: dislikedPlaylistReducer,
  addToPlaylist: addToPlaylistReducer,
  removeFromPlaylist: removeFromPlaylistReducer,
  searchSong: searchSongDetailsReducer,
  searchPlaylist: searchPlaylistDetailsReducer,
  searchArtist: searchArtistDetailsReducer,
  becomeArtist: becomeArtistDetailsReducer,
  artistDetails: artistDetailsReducer,
  followArtistDetails: followArtistDetailsReducer,
  unfollowArtistDetails: unfollowArtistDetailsReducer,
  forgotPasswordDetails: forgotPasswordDetailsReducer,
  viewArtist: viewArtistReducer,
  resetPassword: resetPasswordDetailsReducer,
  userSubscription: userSubscriptionDetailsReducer,
  instituteDetails: instituteDetailsReducer,
  confirmSubscriptionDetails: confirmSubscriptionDetailsReducer,
  countryDetails: countryDetailsReducer,
  createPlanDetails:createPlanReducer,
  viewPlanDetails: viewPlanReducer,
  editPlanDetails: editPlanReducer,
  getPlanDetails: getPlanDetailsReducer,
  deletePlanDetails: deletePlanReducer,
  userRoleDetails: userRoleDetailsReducer,
  approveRequest: approveRequestReducer,
  disapproveRequest: disapproveRequestReducer,
});

export default rootReducer;