<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <nuxt-link to="/" class="navbar-brand">
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
                <li class="nav-item active">
                    <nuxt-link class="nav-link" to="/">
                        {{ $t('nav.portfolio') }}
                        <span class="sr-only">(current)</span>
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/blog">
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
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
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
                    <img
                        class="img d-inline rounded-circle pr-1"
                        src="/myImg.jpeg"
                        width="35"
                        height="35"
                    />
                    Ahmed Adel
                </li>
            </ul>
        </div>
    </nav>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
    get availableLocales() {
        // @ts-ignore
        return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
}
</script>
<style lang="scss"></style>
