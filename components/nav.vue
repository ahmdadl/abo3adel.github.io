<template>
    <nav
        id="navbar-top"
        class="navbar navbar-expand-sm navbar-dark trans"
        :class="[cls, $route.path === '/' ? 'fixed-top' : 'sticky-top']"
    >
        <nuxt-link :to="localePath('/')" class="navbar-brand">
            NinjaCoder
        </nuxt-link>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <!-- <span class="navbar-toggler-icon"></span> -->
            <span id="navbarDropdown" class="nav-link">
                <img
                    class="img d-inline rounded-circle pr-1"
                    src="/myImg.jpeg"
                    width="35"
                    height="35"
                />
                Ahmed Adel
            </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" :class="{ active: $route.path === '/' }">
                    <nuxt-link class="nav-link" :to="localePath('/')">
                        <i class="fas fa-home"></i>
                        {{ $t('nav.portfolio') }}
                        <span class="sr-only">(current)</span>
                    </nuxt-link>
                </li>
                <li
                    class="nav-item"
                    :class="{ active: $route.path.indexOf('/admin') > -1 }"
                    v-if="$auth.loggedIn"
                >
                    <nuxt-link class="nav-link" :to="localePath('/admin')">
                        <i class="fas fa-user-alt"></i>
                        {{ $t('nav.admin') }}
                    </nuxt-link>
                </li>
                <li
                    class="nav-item"
                    :class="{ active: $route.path.indexOf('/blog') > -1 }"
                >
                    <nuxt-link class="nav-link" :to="localePath('/blog')">
                        <i class="fas fa-blog"></i>
                        {{ $t('nav.blog') }}
                    </nuxt-link>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="fas fa-language"></i>
                        {{ $t('nav.lang') }}
                    </a>
                    <div
                        class="dropdown-menu bg-dark text-light"
                        aria-labelledby="navbarDropdown"
                    >
                        <nuxt-link
                            v-for="locale in availableLocales"
                            :key="locale.code"
                            :to="switchLocalePath(locale.code)"
                            class="dropdown-item"
                            :class="
                                locale.code === 'ar'
                                    ? 'text-right'
                                    : 'text-left'
                            "
                        >
                            {{ locale.name }}
                        </nuxt-link>
                    </div>
                </li>
            </ul>

            <!-- right nav -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item text-light">
                    <a
                        class="nav-link"
                        :class="{ 'dropdown-toggle': $auth.loggedIn }"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            class="img d-inline rounded-circle pr-1"
                            src="/myImg.jpeg"
                            width="35"
                            height="35"
                        />
                        Ahmed Adel
                    </a>
                    <div
                        class="dropdown-menu bg-dark text-light"
                        aria-labelledby="userDropdown"
                        v-if="$auth.loggedIn"
                    >
                        <button
                            class="btn btn-clear w-100"
                            @click="$auth.logout('laravelJWT')"
                        >
                            LogOut
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
    @Prop({ type: String, required: true }) readonly path!: string

    public cls: string = 'bg-primary'

    get availableLocales() {
        // @ts-ignore
        return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }

    public isScrolled() {
        const header = document.querySelector(`#canvasHeader`) as HTMLDivElement
        if (window.scrollY >= header.offsetHeight - 30) {
            this.cls = 'bg-primary'
            return
        }
        this.cls = 'bg-transparent'
    }

    @Watch('path')
    onPathChanged(val: string) {
        if (this.path === '/' || this.path === '/ar') {
            this.cls = 'bg-transparent'
            window.addEventListener('scroll', this.isScrolled)
            return
        }

        window.removeEventListener('scroll', this.isScrolled)

        // handle lang changes
        if (this.path.indexOf('/ar') > -1) {
            if (document.documentElement.lang !== 'ar') location.reload()
        } else {
            if (document.documentElement.lang !== 'en') location.reload()
        }
    }

    mounted() {
        if (this.path === '/' || this.path === '/ar') {
            this.cls = 'bg-transparent'
            window.addEventListener('scroll', this.isScrolled)
            return
        }
    }
}
</script>
<style lang="scss"></style>
