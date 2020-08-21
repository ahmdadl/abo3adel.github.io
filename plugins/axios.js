import { Notify } from './notify.ts'

export default function (context, inject) {
    // context.app.$axios.onRequest((config) => {
    //     console.log('Making request to ' + config.url)
    // })

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
