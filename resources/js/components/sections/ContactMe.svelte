<script lang="ts">
    import { crossfade } from 'svelte/transition';
    import { t } from 'svelte-i18n';

    let name: string = '';
    let email: string = '';
    let message: string = '';

    let sending: boolean = false;
    let done: number = 0;

    function testMail(mail: string): boolean {
        if (
            mail.match(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
            )
        ) {
            return true;
        }

        return false;
    }

    function submitForm() {
        // validate
        if (sending || !name.length || !testMail(email) || !message.length) {
            // return;
        }

        sending = true;

        setTimeout(() => {
            sending = false;
            done = 1;
        }, 2000);
    }
</script>

<!-- contact form -->
<div
    class="pt-6 pattern bg-blue-700 dark:bg-transparent text-left rtl:text-right"
>
    <div class="relative justify-around overflow-hidden md:flex bg-transparent">
        <div>
            <p class="mt-1 text-white capitalize text-center font-semibold">
                {$t('contact.as_soon')}
            </p>
        </div>
    </div>
    <form on:submit|preventDefault={submitForm} class="w-full px-2 py-6">
        <div class="flex flex-wrap items-baseline">
            <label
                class="w-full mb-2 text-xs font-bold tracking-wide text-center text-gray-200 uppercase sm:w-2/12 dark:text-gray-200"
                for="grid-name"
                >{$t('contact.form.name')}
            </label>
            <div class="w-full sm:w-10/12">
                <input
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-800 dark:text-gray-200 bg-gray-200 border rounded appearance-none dark:bg-gray-500 dark:focus:bg-gray-600 invalid:border-red-500 focus:outline-none focus:bg-white"
                    id="grid-name"
                    type="text"
                    placeholder="Ahmed Adel"
                    bind:value={name}
                    required
                />
                {#if !name.length}
                    <p
                        class="block w-full text-xs italic text-red-300 font-semibold dark:text-red-500"
                    >
                        {$t('contact.form.error.req')}
                    </p>
                {/if}
            </div>
        </div>
        <div class="flex flex-wrap items-baseline my-6">
            <label
                class="w-full mb-2 text-xs font-bold tracking-wide text-center text-gray-200 uppercase sm:block sm:w-2/12 dark:text-gray-200"
                for="grid-email"
                >{$t('contact.form.email')}
            </label>
            <div class="w-full sm:w-10/12">
                <input
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-800 dark:text-gray-200 bg-gray-200 border rounded appearance-none dark:bg-gray-500 dark:focus:bg-gray-600 invalid:border-red-500 focus:outline-none focus:bg-white"
                    id="grid-email"
                    type="email"
                    placeholder="abo3adel@gmail.com"
                    bind:value={email}
                    required
                />
                {#if !email.length}
                    <p
                        class="block w-full text-xs italic text-red-300 font-semibold dark:text-red-500"
                    >
                        {$t('contact.form.error.req')}
                    </p>
                {:else if !testMail(email)}
                    <p
                        class="block w-full text-xs italic text-red-300 font-semibold dark:text-red-500"
                    >
                        {$t('contact.form.error.invalid')}
                    </p>
                {/if}
            </div>
        </div>
        <div class="flex flex-wrap my-2 mb-6">
            <label
                class="block w-full mb-2 text-xs font-bold tracking-wide text-center text-gray-200 uppercase sm:w-2/12 dark:text-gray-200"
                for="grid-message"
                >{$t('contact.form.message')}
            </label>
            <div class="w-full sm:w-10/12">
                <textarea
                    class="block w-full h-48 px-4 py-3 mb-3 leading-tight text-gray-800 dark:text-gray-200 bg-gray-200 border border-gray-200 rounded appearance-none resize-none dark:bg-gray-500 dark:focus:bg-gray-600 invalid:border-red-500 no-resize focus:outline-none focus:bg-white focus:border-gray-500"
                    id="message"
                    bind:value={message}
                    required
                />
                {#if !message.length}
                    <p
                        class="block w-full text-xs italic text-red-300 font-semibold dark:text-red-500"
                    >
                        {$t('contact.form.error.req')}
                    </p>
                {/if}
            </div>
        </div>
        <div class="flex items-center my-2">
            <div class="w-0 md:w-2/12" />
            <div class="w-9/12">
                <button
                    class="w-1/4 btn !text-white !border-white hover:bg-blue-900"
                    type="submit"
                    disabled={!name.length ||
                        !testMail(email) ||
                        !message.length}
                >
                    <i
                        class={'mx-1 fa ' +
                            (sending ? 'fa-spin fa-redo' : 'fa-save')}
                    />
                    <span>{$t('contact.form.send')}</span>
                </button>
            </div>
        </div>
        {#if done === 1}
            <div class="flex items-center w-full" transition:crossfade>
                <div
                    class="flex max-w-sm my-4 mx-auto bg-green-300 dark:bg-green-600"
                >
                    <div class="w-16 bg-green-500 dark:bg-green-700">
                        <div class="p-4">
                            <svg
                                class="w-8 h-8 text-white fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                ><path
                                    d="M468.907 214.604c-11.423 0-20.682 9.26-20.682 20.682v20.831c-.031 54.338-21.221 105.412-59.666 143.812-38.417 38.372-89.467 59.5-143.761 59.5h-.12C132.506 459.365 41.3 368.056 41.364 255.883c.031-54.337 21.221-105.411 59.667-143.813 38.417-38.372 89.468-59.5 143.761-59.5h.12c28.672.016 56.49 5.942 82.68 17.611 10.436 4.65 22.659-.041 27.309-10.474 4.648-10.433-.04-22.659-10.474-27.309-31.516-14.043-64.989-21.173-99.492-21.192h-.144c-65.329 0-126.767 25.428-172.993 71.6C25.536 129.014.038 190.473 0 255.861c-.037 65.386 25.389 126.874 71.599 173.136 46.21 46.262 107.668 71.76 173.055 71.798h.144c65.329 0 126.767-25.427 172.993-71.6 46.262-46.209 71.76-107.668 71.798-173.066v-20.842c0-11.423-9.259-20.683-20.682-20.683z"
                                /><path
                                    d="M505.942 39.803c-8.077-8.076-21.172-8.076-29.249 0L244.794 271.701l-52.609-52.609c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.077-8.077 21.172 0 29.249l67.234 67.234a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058L505.942 69.052c8.077-8.077 8.077-21.172 0-29.249z"
                                /></svg
                            >
                        </div>
                    </div>
                    <div
                        class="items-center w-auto p-4 text-grey-700 dark:text-gray-300"
                    >
                        <span class="pb-4 text-lg font-bold">
                            {$t('contact.alert.heads')}
                        </span>
                        <p class="leading-tight">
                            {$t('contact.alert.success')}
                        </p>
                    </div>
                </div>
            </div>
        {:else if done === -1}
            <div class="flex items-center w-full" transition:crossfade>
                <div
                    class="flex max-w-sm my-4 mx-auto bg-red-300 dark:bg-red-600"
                    transition:crossfade
                >
                    <div class="w-16 bg-red-500 dark:bg-red-700">
                        <div class="p-4">
                            <svg
                                class="w-8 h-8 text-white fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                ><path
                                    d="M437.019 74.981C388.667 26.629 324.38 0 256 0S123.333 26.63 74.981 74.981 0 187.62 0 256s26.629 132.667 74.981 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.668-74.981-181.019zM256 470.636C137.65 470.636 41.364 374.35 41.364 256S137.65 41.364 256 41.364 470.636 137.65 470.636 256 374.35 470.636 256 470.636z"
                                    fill="#FFF"
                                /><path
                                    d="M341.22 170.781c-8.077-8.077-21.172-8.077-29.249 0L170.78 311.971c-8.077 8.077-8.077 21.172 0 29.249 4.038 4.039 9.332 6.058 14.625 6.058s10.587-2.019 14.625-6.058l141.19-141.191c8.076-8.076 8.076-21.171 0-29.248z"
                                    fill="#FFF"
                                /><path
                                    d="M341.22 311.971l-141.191-141.19c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l141.19 141.191a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058c8.075-8.077 8.075-21.172-.001-29.249z"
                                    fill="#FFF"
                                /></svg
                            >
                        </div>
                    </div>
                    <div
                        class="items-center w-auto p-4 text-grey-700 dark:text-gray-300"
                    >
                        <span class="pb-4 text-lg font-bold">
                            {$t('contact.alert.heads')}
                        </span>
                        <p class="leading-tight">
                            {$t('contact.alert.error')}
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    </form>
</div>
