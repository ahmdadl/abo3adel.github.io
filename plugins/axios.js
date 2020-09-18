import { Notify } from './notify.ts'

export default function (context, inject) {
    context.app.$axios.onRequest((config) => {
        config.headers['X-Laravel-Locale'] = context.app.i18n.locale
        
        if (config.url.indexOf('post') > -1) {
            // config.baseUrl = '/assets/json/'
            // config.url = 'posts/0.json'
        }

        console.log(config)
    })

    context.app.$axios.onError((error) => {
        new Notify(context.app.i18n).error()
        const code = parseInt(error.response && error.response.status)
        // if (code === 400) {
        //     // redirect('/400')
        //     // context.app.$axios.redirect('/400')
        // }
        if (code === 422) {
            // console.log('asdasd')
        }
    })
}
