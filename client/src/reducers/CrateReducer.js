import uuid from 'uuid/v4';

// PETE Todo: I'm replacing this, so make sure it's gone and there's no references to it

export const CrateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CRATE_ITEM':
      return [...state, {
        artists: action.crateItem.artists,
        releaseName: action.crateItem.releaseName,
        id: uuid()}
      ]
    case 'REMOVE_CRATE_ITEM':
      return state.filter(crateItem => crateItem.id !== action.id);
    default:
      return state;
  }
}
