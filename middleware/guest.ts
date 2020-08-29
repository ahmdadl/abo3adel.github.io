import { Middleware } from '@nuxt/types'

const Guest: Middleware = (context) => {
  if (context.$auth.loggedIn) {
      context.redirect('/')
  }
}

export default Guest