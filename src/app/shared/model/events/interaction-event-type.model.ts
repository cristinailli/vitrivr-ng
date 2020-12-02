/** A type of user interaction as possible within vitrivr NG. */
export enum InteractionEventType {
  QUERY_IMAGE,
  QUERY_AUDIO,
  QUERY_MOTION,
  QUERY_MODEL3D,
  QUERY_FULLTEXT,
  QUERY_TAG,
  QUERY_SEMANTIC,
  QUERY_BOOLEAN,
  MLT,
  CLEAR,
  REFINE,
  FILTER,
  HIGHLIGHT,
  BROWSE,
  SCROLL,
  EXPAND,
  EXAMINE,
  PLAY,
  NAVIGATE,
  NEW_QUERY_STAGE,
  NEW_QUERY_CONTAINER,
  RESULT_SET_INFORMATION,
  ADD_TAG_RESULT_INFO,
}
