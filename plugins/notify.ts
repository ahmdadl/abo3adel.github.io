import { Vue } from 'vue-property-decorator'
// import Vue, { PropOptions, WatchOptions } from 'vue'
import Notifications from 'vue-notification'
import i18n, { TranslateResult } from 'vue-i18n'
import { Plugin } from '@nuxt/types'

Vue.use(Notifications)

interface NotifyInterface {
    /**
     * show success toast
     *
     * @param title string
     * @param text string
     */
    success(
        title?: string | TranslateResult,
        text?: string | TranslateResult
    ): void

    /**
     * show error toast
     *
     * @param title string
     * @param text string
     */
    error(
        title?: string | TranslateResult,
        text?: string | TranslateResult
    ): void

    /**
     * show warn toast
     *
     * @param title string
     * @param text string
     */
    warn(
        ttitle?: string | TranslateResult,
        text?: string | TranslateResult
    ): void

    /**
     * show info toast
     *
     * @param title string
     * @param text string
     */
    info(
        title?: string | TranslateResult,
        text?: string | TranslateResult
    ): void
}

declare module 'vue/types/vue' {
    interface Vue {
        readonly $nf: NotifyInterface
    }
}

export class Notify implements NotifyInterface {
    private _i18n: i18n

    public constructor(i18n: i18n) {
        this._i18n = i18n
    }

    public success(
        title: string | TranslateResult = this._i18n.t('notify.success'),
        text: string | TranslateResult = this._i18n.t('notify.successText')
    ): void {
        this.fire(title, text, 'success')
    }

    public error(
        title: string | TranslateResult = this._i18n.t('notify.error'),
        text: string | TranslateResult = this._i18n.t('notify.errorText')
    ): void {
        this.fire(title, text, 'error')
        // @ts-ignore
        // console.log(app.i18n)
    }

    public warn(
        title: string | TranslateResult = this._i18n.t('notify.warn'),
        text: string | TranslateResult = this._i18n.t('notify.warnText')
    ): void {
        this.fire(title, text, 'warn')
    }

    public info(
        title: string | TranslateResult = this._i18n.t('notify.info'),
        text: string | TranslateResult = this._i18n.t('notify.infoText')
    ): void {
        this.fire(title, text)
    }

    private fire(title: any, text: any = '', type: string = ''): void {
        Vue.notify({
            group: 'foo',
            title,
            text,
            type,
        })
    }
}

const myPlugin: Plugin = (context, inject) => {
    Vue.prototype.$nf = new Notify(context.app.i18n)
}

export default myPlugin