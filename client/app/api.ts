import axios from 'axios'

// attaches token to every path that uses this object
const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token
  return config
})

const signupUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/signup'

const loginUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/login'

const persistUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/persist-user'

// const addWordUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-word'

// const updateWordUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-word'

// const addWordImageUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/store-image'

// const deleteWordUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/delete-word'

// const addTopicUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-topic'

// const updateTopicUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-topic'

// const deleteTopicUrl =
//   'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/delete-topic'

// TODO: require token passed in header
export default {
  user: {
    signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),

    login: credentials =>
      axios.post(loginUrl, { credentials }).then(res => res.data),

    persistUser: identity =>
      axios.post(persistUrl, { identity }).then(res => res.data)
  }
}
