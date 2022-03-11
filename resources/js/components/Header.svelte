<script>
    import { onMount } from 'svelte'
    import { t } from 'svelte-i18n';
    import { runAnimatedDots } from '../helpers/AnimatedDots';


    onMount(() => {
        runAnimatedDots('canvas');
    })
</script>

<header id="canvas-header" class="relative w-full h-screen">
    <canvas id="canvas" class="w-100 h-100" />
    <div
        class="container absolute top-0 left-0 justify-center w-full align-middle d-flex h-100 align-items-center rtl:right-0"
        style="height: 100vh; width: 100vw"
    >
        <div
            class="text-white mx-auto text-center relative top-[50%] translate-y-[-50%]"
        >
            <h1 class="mx-auto my-0 text-3xl capitalize">
                <span>{$t('home.hello')}</span>
                <span
                    class="p-1 text-white capitalize bg-red-600 rounded-md small-caps"
                    >{$t('home.name')}
                </span>
            </h1>
            <h2 class="mx-auto mt-2 mb-5 text-lg text-white">
                {$t('home.and')}
            </h2>
            <h1 id="" class="text-2xl">
                <span id="job-title"> . </span>
                <span id="blink" class="blink">|</span>
            </h1>
        </div>
    </div>
</header>
