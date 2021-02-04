import uuid from 'uuid/v4';

export const ReleaseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DUMMY_RELEASE':
      return [...state, {
        artists: action.release.artists,
        href: '',
        releaseName: action.release.releaseName,
        trackName: '',
        label: '',
        durationMiSecs: '',
        releaseDate: '',
        albumType: '',
        id: uuid()}
      ]
    case 'ADD_RELEASES': {
      action.releases.map(release => {
        console.log ("release.releaseName:" + release.releaseName);
        return release.releaseName;
      });
      // Note I actually think you WOULD replace the array, refresh it every time
      return action.releases;
      // return [...state, ...action.releases];
    }
    case 'REMOVE_RELEASE': {
      return state.filter(release => {
        console.log ("ReleaseReducer, release:" + JSON.stringify(release));
        console.log ("ReleaseReducer, action:" + JSON.stringify(action));
          return release.releaseName !== action.release.releaseName;
      });
    }
    default:
      return state;
  }
}

// action.releases.map(release => {
//   return ( <CrateDetails release={release} key={release.id} /> );
// })

// action.releases.map(release => {
//   return [...state, {
//     artists: release.artists,
//     href: release.href,
//     releaseName: release.releaseName,
//     trackName: release.trackName,
//     label: release.label,
//     durationMiSecs: release.durationMiSecs,
//     releaseDate: release.releaseDate,
//     albumType: release.albumType,
//     id: uuid()}];
// });
