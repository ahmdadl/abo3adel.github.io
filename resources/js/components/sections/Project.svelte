<script lang="ts">
    import { slide } from 'svelte/transition';
    import { t } from 'svelte-i18n';
    import type ProjectInterface from '../../interfaces/ProjectInterface';
    import useLazyImage from 'svelte-lazy-image/use-lazy-image';
    import Modal from '../Modal.svelte';
    import Slider from '../Slider.svelte';

    let activeTab = 'all';
    let modalOpend = false;
    let currentProject: ProjectInterface = {
        slug: '',
        title: '',
        link: '',
        category: [],
        img: [],
        type: '',
        download_url: '',
        tags: [],
    };

    const tabs = [
        { title: $t('home.project.tabs.all'), value: 'all' },
        { title: $t('home.project.tabs.laravel'), value: 'laravel' },
        { title: $t('home.project.tabs.spa'), value: 'spa' },
        { title: $t('home.project.tabs.mobile'), value: 'mobile' },
    ];

    const projects: ProjectInterface[] = [
        {
            slug: 'eshop-laravel',
            title: 'eshop',
            link: 'http://eshopt.rf.gd/en/',
            category: ['Full Stack'],
            img: [
                'https://images.test/posts/0.jpg',
                'https://images.test/posts/1.jpg',
                'https://images.test/posts/2.jpg',
            ],
            type: 'laravel',
            download_url: '',
            tags: ['e-commerace', 'multi lang', 'multi user access'],
        },
        {
            slug: 'google-wewe',
            title: 'google',
            link: 'http://googlet.rf.gd/en/',
            category: ['api'],
            img: [
                'https://images.test/posts/3.jpg',
                'https://images.test/posts/4.jpg',
                'https://images.test/posts/5.jpg',
            ],
            type: 'laravel',
            download_url: '',
            tags: ['lumen', 'shop'],
        },
        {
            slug: 'wesdasd-laravel',
            title: 'ouath',
            link: 'http://api.rf.gd/en/',
            category: ['api', 'lumen'],
            img: [
                'https://images.test/posts/0.jpg',
                'https://images.test/posts/1.jpg',
                'https://images.test/posts/2.jpg',
            ],
            tags: [],
            type: 'laravel',
            download_url: '',
        },
        {
            slug: 'volunterr-data',
            title: 'volunterr',
            link: 'http://volunterrt.rf.gd/en/',
            category: ['ionic'],
            img: [
                'https://images.test/posts/7.jpg',
                'https://images.test/posts/8.jpg',
                'https://images.test/posts/9.jpg',
            ],
            type: 'mobile',
            download_url: 'http://volunterrt.rf.gd/en/a.apk',
        },
        {
            slug: 'cachier-laravel',
            title: 'cacher',
            link: 'http://cachert.rf.gd/en/',
            category: ['vueJs'],
            img: [
                'https://images.test/posts/10.jpg',
                'https://images.test/posts/11.jpg',
                'https://images.test/posts/12.jpg',
            ],
            type: 'spa',
            download_url: '',
        },
        {
            slug: 'azkar-laravel',
            title: 'azkar',
            link: 'http://azkr.rf.gd/en/',
            category: ['flutter', 'hasApi'],
            img: [
                'https://images.test/posts/13.jpg',
                'https://images.test/posts/14.jpg',
                'https://images.test/posts/15.jpg',
            ],
            type: 'mobile',
            download_url: 'http://azkr.rf.gd/en/asd.apk',
        },
    ];

    async function loadProjects(): Promise<ProjectInterface[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res(projects);
            }, 3000);
        });
    }

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
    {#await loadProjects()}
        <div class="w-full mx-auto pt-8 my-5">
            <div class="flex items-center justify-center ">
                <div
                    class="w-24 h-24 border-l-2 border-blue-800 dark:border-blue-300 text-blue-800 font-bold dark:text-blue-300 rounded-full animate-spin shadow-lg dark:shadow-white"
                >
                    <span>....</span>
                </div>
            </div>
        </div>
    {:then projects}
        <div
            class="grid grid-cols-1 gap-5 p-3 sm:p-4 md:p-6 md:grid-cols-2 lg:grid-cols-3"
        >
            {#each projects as proj}
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
                                data-src={proj.img[0]}
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
                                {#each proj.category as cat}
                                    <span
                                        class="mx-1 bg-blue-500 px-3 py-1.5 rounded-full"
                                        >{cat}</span
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
                                {#if proj.download_url.length > 1}
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
    <Slider images={currentProject.img} />
</Modal>
