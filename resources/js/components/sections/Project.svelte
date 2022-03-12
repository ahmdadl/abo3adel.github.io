<script lang="ts">
    import { slide } from 'svelte/transition';
    import { t } from 'svelte-i18n';
    import type ProjectInterface from '../../interfaces/ProjectInterface';
    import useLazyImage from 'svelte-lazy-image/use-lazy-image';
    import Modal from '../Modal.svelte';
    import Slider from '../Slider.svelte';
    import axios from 'axios';
    import { API_URL } from '../../helpers/Config.ts';

    let activeTab = 'all';
    let modalOpend = false;
    let currentProject: ProjectInterface = {
        slug: '',
        title: '',
        link: '',
        tags: [],
        img: '',
        shots: [],
        type: '',
        download_url: '',
    };

    const tabs = [
        { title: $t('home.project.tabs.all'), value: 'all' },
        { title: $t('home.project.tabs.laravel'), value: 'laravel' },
        { title: $t('home.project.tabs.spa'), value: 'spa' },
        { title: $t('home.project.tabs.mobile'), value: 'mobile' },
    ];

    function openModal(proj: ProjectInterface) {
        currentProject = Object.assign({}, proj);
        modalOpend = true;
    }
</script>

<div>
    <div>
        <!-- projects list tabs -->
        <ul class="flex items-center justify-center my-4 ">
            {#each tabs as tab}
                <li
                    class={'px-4 py-2 transition border-b-8 cursor-pointer dark:border-b-gray-700 ' +
                        (activeTab === tab.value
                            ? 'text-blue-500 !border-blue-500 font-semibold'
                            : 'text-gray-500')}
                    on:click|preventDefault={() => {
                        activeTab = tab.value;
                    }}
                >
                    {tab.title}
                </li>
            {/each}
        </ul>
    </div>
    <div class="py-2 my-2 text-orange-900 bg-orange-400 rounded">
        <i
            class="inline-block mx-1 text-orange-800 fas fa-exclamation-circle"
        />
        <strong>{$t('home.alert.note')}</strong>
        <span>{$t('home.alert.alertMessage')}</span>
    </div>

    <!-- project list -->
    {#await axios.get(API_URL + 'projects')}
        <div class="w-full pt-8 mx-auto my-5">
            <div class="flex items-center justify-center ">
                <div
                    class="w-24 h-24 font-bold text-blue-800 border-l-2 border-blue-800 rounded-full shadow-lg dark:border-blue-300 dark:text-blue-300 animate-spin dark:shadow-white"
                >
                    <span>....</span>
                </div>
            </div>
        </div>
    {:then response}
        <div
            class="grid grid-cols-1 gap-5 p-3 sm:p-4 md:p-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {#each response.data.projects as proj}
                {#if proj.type === activeTab || activeTab === 'all'}
                    <div
                        class="flex flex-col items-start overflow-hidden shadow-sm span-12 rounded-xl md:span-6 lg:span-4"
                        transition:slide={{ duration: 500 }}
                    >
                        <a
                            href={'#'}
                            class="block transition duration-300 ease-out transform hover:scale-110"
                            on:click|preventDefault={() => {
                                openModal(proj);
                            }}
                        >
                            <img
                                class="object-cover w-full h-full shadow-sm"
                                src="/img/rings.svg"
                                data-src={proj.img}
                                alt={proj.title + ' image'}
                                use:useLazyImage
                            />
                        </a>
                        <div
                            class="relative flex flex-col items-start w-full px-6 bg-gray-200 border border-t-0 border-gray-400 dark:bg-gray-700 py-7 rounded-b-2xl"
                        >
                            <div
                                class="absolute top-0 flex items-center w-auto -mt-3 text-xs font-medium leading-none text-white uppercase"
                            >
                                <span
                                    class="bg-blue-500 px-3 py-1.5 rounded-full"
                                    >{proj.type}</span
                                >
                                {#each proj.tags as tag}
                                    <span
                                        class="mx-1 bg-blue-500 px-3 py-1.5 rounded-full"
                                        >{tag}</span
                                    >
                                {/each}
                            </div>
                            <h2
                                class="text-base font-bold text-gray-800 capitalize dark:text-gray-300 sm:text-lg md:text-xl small-caps hover:text-blue-700 dark:hover:text-blue-400"
                            >
                                <a
                                    class="inline-block font-semibold link"
                                    href={proj.link}>{proj.title}</a
                                >
                            </h2>
                            <div
                                class={'flex flex-row items-end justify-end w-full px-2 pt-2 space-x-2 text-sm capitalize' +
                                    (proj.download_url ? 'text-xs' : '')}
                            >
                                <a href={proj.link} target="_blank" class="btn">
                                    <i class="inline-block mx-1 fas fa-link" />
                                    <span>{$t('home.project.modal.visit')}</span
                                    >
                                </a>
                                <button
                                    class="inline-block mx-1 text-green-800 border-green-600 btn hover:bg-green-700 dark:text-green-400 dark:border-green-400"
                                    type="button"
                                    on:click|preventDefault={() => {
                                        openModal(proj);
                                    }}
                                >
                                    <i class="fas fa-at" />
                                    <span
                                        >{$t(
                                            'home.project.modal.moreInfo'
                                        )}</span
                                    >
                                </button>
                                {#if proj.download_url?.length > 1}
                                    <a
                                        href={proj.download_url}
                                        target="_blank"
                                        class="text-red-800 border-red-600 btn hover:bg-red-700 dark:text-red-400 dark:border-red-400"
                                    >
                                        <i class="fas fa-download" />
                                        <span>
                                            {$t('home.project.modal.download')}
                                        </span>
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {:catch err}
        <div class="w-4/5 py-2 mx-auto my-6 text-red-900 capitalize bg-red-400 rounded">
            <i
                class="inline-block mx-1 text-red-800 fas fa-exclamation-circle"
            />
            <strong>{$t('home.project.error')}</strong>
        </div>
    {/await}
</div>

<!-- project Modal -->
<Modal
    modalIsOpend={modalOpend}
    title={currentProject.title}
    on:modal={(ev) => {
        modalOpend = ev.detail.opend;
    }}
>
    <Slider images={currentProject.shots} />
</Modal>
