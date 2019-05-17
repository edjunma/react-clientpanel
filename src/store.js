import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
// @todo

const firebaseConfig = {
	apiKey: "AIzaSyBKUcM_Ww7lRteV1F8SlX-YBZS8qrwAIQA",
	authDomain: "react-clientpanel-34ffc.firebaseapp.com",
	databaseURL: "https://react-clientpanel-34ffc.firebaseio.com",
	projectId: "react-clientpanel-34ffc",
	storageBucket: "react-clientpanel-34ffc.appspot.com",
	messagingSenderId: "573555079492",
	appId: "1:573555079492:web:b626816879091b43"
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true //Firestore for Profile instead of realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), //firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
	)
);

export default store;
