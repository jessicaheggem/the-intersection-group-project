import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadToAws(action) {
  try {
    let filename = action.payload.name
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        Key: filename,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };

    let response = yield axios.get('/api/aws/generate-put-url', config)
    let putUrl = response.data
    console.log(putUrl);
    let putResponse = yield axios.put(putUrl, action.payload)
    console.log(putResponse);
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getMediaFromNames(action) {
  let selectedMedia = []
  for (let imageName of action.payload) {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        Key: imageName,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };

    yield axios.get('/api/aws/generate-get-url', config).then(res => {
      console.log(res);
      selectedMedia = [...selectedMedia, res.data]
    });
    yield put({ type: 'SET_SELECTED_CLIENT_MEDIA', payload: selectedMedia })

  }
}

function* awsSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('GET_MEDIA_FROM_NAMES', getMediaFromNames)
}

export default awsSaga;