import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";

export const afConfig = {
  apiKey: "AIzaSyCOm8FwfjmIjHqLwpKvMfDCvrv1e58Tkt4",
  authDomain: "fcc-chadsheets-com.firebaseapp.com",
  databaseURL: "https://fcc-chadsheets-com.firebaseio.com",
  storageBucket: "fcc-chadsheets-com.appspot.com",
  messagingSenderId: "487755790032"
};

export const afAuthConfig = {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
};