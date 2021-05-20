export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.properties
);

export const collectionSelector = createSelector(
  rootSelector,
  state => state.collection
);
