export const normalize = (input: MergedApiBoards) => {
  const normalized = normalizr.normalize<
    MergedApiBoards,
    BoardsEntities,
    number[]
  >(input, schema);

  return {
    ids: {
      boards: normalized.result,
      images: Object.keys(normalized.entities.boards).map(key => Number(key)),
    },
    collections: {
      boards: normalized.entities.boards,
      images: normalized.entities.images,
    },
  };
};

export const denormalize = (
  boardsCollection: Record<string, Board>,
  imagesCollection: Record<string, Image>,
  boardsIds: (number | string)[]
): (Omit<Board, 'images'> & { images: Image[] })[] =>
  normalizr.denormalize(boardsIds, schema, {
    boards: boardsCollection,
    images: imagesCollection,
  });
