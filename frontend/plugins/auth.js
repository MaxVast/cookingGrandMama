import jwt_decode from "jwt-decode";

export default function ({ $auth, $api, store }) {
  if (!$auth.loggedIn) return

  const jwtToken = $auth.strategy.token.get()
  $auth.setUser(jwt_decode(jwtToken))
}
