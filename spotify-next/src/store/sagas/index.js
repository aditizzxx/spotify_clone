import { all } from 'redux-saga/effects';
import { watchLoginDetailsSaga } from './login';
import { fetchSignupDetailsActionWatcher } from './signup';
import { fetchDeleteSongActionWatcher } from './deleteSong';
import { fetchCreatePlaylistActionWatcher } from './createPlaylist';
import { watchViewPlaylistSaga } from './viewPlaylists';
import { fetchPlaylistDetailsActionWatcher } from './playlist';
import { fetchUpdatePlaylistActionWatcher } from './editPlaylist';
import { fetchDeletePlaylistActionWatcher } from './deletePlaylist';
import { fetchUpdatePasswordActionWatcher } from './updatePassword';
import { fetchUpdateUserActionWatcher } from './updateUserInfo';
import { fetchUserDetailsActionWatcher } from './userDetails';
import { fetchCreateSongActionWatcher } from './createSong';
import { fetchViewSongsActionWatcher } from './viewSongs';
import { fetchLikeSongActionWatcher } from './likeSong';
import { fetchDislikeSongActionWatcher } from './dislikeSong';
import { fetchUpdateSongActionWatcher } from './updateSong';
import { fetchSongDetailsActionWatcher } from './songs';
import { fetchLikedPlaylistActionWatcher } from './likedPlaylist';
import { fetchAddToPlaylistActionWatcher } from './addToPlaylist';
import { fetchDislikedPlaylistActionWatcher } from './dislikedPlaylist';
import { fetchRemoveFromPlaylistActionWatcher } from './removeFromPlaylist';
import { fetchSearchSongActionWatcher } from './searchSong';
import { fetchSearchPlaylistActionWatcher } from './searchPlaylist';
import { fetchSearchArtistActionWatcher } from './searchArtist';
import { fetchArtistRoleActionWatcher } from './becomeArtist';
import { fetchArtistDetailsActionWatcher } from './artist';
import { fetchFollowArtistDetailsActionWatcher } from './followArtist';
import { fetchUnfollowArtistDetailsActionWatcher } from './unfollowArtist';
import { fetchForgotPasswordDetailsActionWatcher } from './forgotPassword';
import { fetchViewArtistDetailsActionWatcher } from './viewArtist';
import { fetchResetPasswordDetailsActionWatcher } from './resetPassword';
import { fetchUserSubscriptionDetailsActionWatcher } from './userSubscription';
import { fetchInstituteDetailsActionWatcher } from './institute';
import { fetchConfirmSubscriptionDetailsActionWatcher } from './confirmSubscription';
import { fetchCountryDetailsActionWatcher } from './country';
import { fetchCreatePlanDetailsActionWatcher } from './createPlan';
import { fetchViewPlanDetailsActionWatcher } from './viewPlan';
import { fetchEditPlanDetailsActionWatcher } from './editPlan';
import { fetchPlanDetailsActionWatcher } from './getPlan';
import { fetchDeletePlanDetailsActionWatcher } from './deletePlan';
import { fetchUserRoleDetailsActionWatcher } from './userRoleDetails';
import { fetchApproveRequestDetailsActionWatcher } from './approveRequest';
import { fetchDisApproveRequestDetailsActionWatcher } from './disapproveRequest';

export default function* rootSaga() {
  yield all([
    watchLoginDetailsSaga(),


    fetchSignupDetailsActionWatcher(),
    fetchDeleteSongActionWatcher(),
    fetchCreatePlaylistActionWatcher(),
    watchViewPlaylistSaga(),
    fetchPlaylistDetailsActionWatcher(),
    fetchUpdatePlaylistActionWatcher(),
    fetchDeletePlaylistActionWatcher(),
    fetchUpdatePasswordActionWatcher(),
    fetchUpdateUserActionWatcher(),
    fetchUserDetailsActionWatcher(),
    fetchCreateSongActionWatcher(),
    fetchViewSongsActionWatcher(),
    fetchLikeSongActionWatcher(),
    fetchDislikeSongActionWatcher(),
    fetchUpdateSongActionWatcher(), 
    fetchSongDetailsActionWatcher(),
    fetchLikedPlaylistActionWatcher(),
    fetchDislikedPlaylistActionWatcher(),
    fetchAddToPlaylistActionWatcher(),
    fetchRemoveFromPlaylistActionWatcher(),
    fetchSearchSongActionWatcher(),
    fetchSearchPlaylistActionWatcher(),
    fetchSearchArtistActionWatcher(),
    fetchArtistRoleActionWatcher(),
    fetchArtistDetailsActionWatcher(),
    fetchFollowArtistDetailsActionWatcher(),
    fetchUnfollowArtistDetailsActionWatcher(),
    fetchForgotPasswordDetailsActionWatcher(),
    fetchViewArtistDetailsActionWatcher(),
    fetchResetPasswordDetailsActionWatcher(),
    fetchUserSubscriptionDetailsActionWatcher(),
    fetchInstituteDetailsActionWatcher(),
    fetchConfirmSubscriptionDetailsActionWatcher(),
    fetchCountryDetailsActionWatcher(),
    fetchCreatePlanDetailsActionWatcher(),
    fetchViewPlanDetailsActionWatcher(),
    fetchEditPlanDetailsActionWatcher(),
    fetchPlanDetailsActionWatcher(),
    fetchDeletePlanDetailsActionWatcher(),
    fetchUserRoleDetailsActionWatcher(),
    fetchApproveRequestDetailsActionWatcher(),
    fetchDisApproveRequestDetailsActionWatcher(),
  ]);
}