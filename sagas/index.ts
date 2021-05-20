function* createDeals({
  payload,
}: PayloadAction<{
  lender: string;
  total_price: string;
  request_id: string | number;
  tagList: Array<{
    name: string;
    destroy: boolean;
  }>;
}>) {
  try {
    const response = toNormalizeWithCamelCaseDeal(
      yield request(api.createDeals, payload)
    );
    yield put({
      type: actions.pushDeal.type,
      payload: response,
    });
    yield pushNotification('Deals has been created', 'Success!');
    yield put({
      type: appActions.setLoader.type,
      payload: {
        isLoad: false,
        action: TYPES_OF_LOADER.create,
      },
    });
  } catch (e) {
    yield put({
      type: appActions.setLoader.type,
      payload: {
        isLoad: false,
        action: TYPES_OF_LOADER.create,
      },
    });
  }
}


function* avatarUpload(action) {
  const { image, lowImage } = action.payload;
  const { uid } = authRef.currentUser;
  const metadata = {
    contentType: image.type,
  };

  // upload low quality image
  const lowImageRef = yield storage
    .ref(`lowAvatars/${uid}`)
    .put(lowImage, metadata);
  const lowUrl = yield lowImageRef.ref.getDownloadURL();
  // create reference upload image (see docs firebase)
  const uploadTask = storageRef.child(`avatars/${uid}`).put(image, metadata);
  // create emit channel, he returned progress bar upload file and his url in the end
  const channel = eventChannel(emit =>
    uploadTask.on(
      'state_changed',
      emit,
      error => {
        emit(error);
      },
      () => emit(uploadTask.snapshot.ref.getDownloadURL())
    )
  );
  while (true) {
    try {
      // take info from channel
      const snapshot = yield take(channel);
      // if state === 'running' then me get progress status file else get url and do dispatch
      if (snapshot.state === 'running') {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        yield put({
          type: setProgressUpload.type,
          payload: progress,
        });
      } else {
        const url = yield snapshot;
        yield FireSaga.setToCollection(
          API_PATH.users,
          uid,
          { avatarURL: url, lowAvatarURL: lowUrl },
          true
        );
        yield put({
          type: setNewAvatar.type,
          payload: { url, lowUrl },
        });
        yield put({
          type: updateAvatar.type,
          payload: lowUrl,
        });
        yield put({
          type: setProgressUpload.type,
          payload: 0,
        });
        yield put({
          type: setLoader.type,
          payload: false,
        });
      }
    } catch (e) {
      yield put({
        type: setError.type,
        payload: {
          message: e.message,
          idError: 'uploadImage',
        },
      });
    }
  }
}
