import { auth } from "../../firebase";
import saveProviderUser from "./saveProviderUser";
export default async function getUserWithProviderSignUp(
    provider,
    dispatch,
    setError
) {
    return auth
        .signInWithPopup(provider)
        .then(function (result) {
            const { user, additionalUserInfo } = result;
            if (additionalUserInfo.isNewUser) {
                saveProviderUser(
                    user,
                    additionalUserInfo.profile,
                    additionalUserInfo.providerId
                );
            }
        })
        .catch(function (error) {
            dispatch(setError(error));
        });
}
