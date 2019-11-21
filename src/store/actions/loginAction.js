import firebase from "./../../config/config";
import { auth } from "./auth";

const loginAction = (e, email, password) => {
  return dispatch => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        dispatch(auth(true, null));
      })
      .catch(error => {
        dispatch(auth(false, error));
      
      });
  };
};
export default loginAction;

/************************ 
import { take, call, put } from 'redux-saga/effects'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}
 function* auth (util , mdp){
   try {
      const token = yield call('./auth',token)
      return token
   }catch(error){
     yield put({type:'AUTH',error })
   }
 }
function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}
function* loginF(){
  while(true){
    const { util, mdp} = yield take('AUTH')
    const token =yield call(auth, util,mdp)
    if(token){
      yield call('./auth',{token})
      yield take('Logout')
      yield call('./auth','token')
    }
  }
}

function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}
function* watchFetch() {
  while (yield take(FETCH_POSTS)) {
    yield call(fetchPosts) 
  }
}
function* fetchP(){
  yield put(actions.requestPosts())
  const pro = yield call(fetchP , '/Sujet_pr')
  yield put(actions.receivePosts(products))
}
export default function* vfetc(){
  while(yield take(FETCH_POSTS)){
    yield call(fetchP)
  }
}
function* fetchAll() {
  const task1 = yield fork(fetchResource, 'util')
  const task2 = yield fork(fetchResource, 'mdp')
  yield delay(1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}
*/







