import { auth, firestore } from "../../firebase";

export default async function getUserWithProviderSignUp(
    provider,
    dispatch,
    setError
) {
    return auth
        .signInWithPopup(provider)
        .then(function (result) {
            firestore
                .collection("users")
                .doc(result.user.uid)
                .set({ ...result.additionalUserInfo });

            // console.log("result.credential", result.credential);
            // console.log("token", token);
            // The signed-in user info.
            // ...
        })
        .catch(function (error) {
            console.log("error", error);
            // Handle Errors here.
            dispatch(setError(error));
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
        });
}
