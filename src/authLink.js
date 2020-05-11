import { Auth } from 'aws-amplify';
import { setContext } from 'apollo-link-context';

const authLink = setContext(async (_, { headers }) => {
  let token;
  try {
    token = await Auth.currentSession();
  } catch (e) {
    return { headers };
  }
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token.accessToken.jwtToken}` : null,
    },
  };
});

export default authLink;
