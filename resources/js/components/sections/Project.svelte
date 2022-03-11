<script lang="ts">
    import { slide } from 'svelte/transition';
    import { t } from 'svelte-i18n';
    import type ProjectInterface from '../../interfaces/ProjectInterface';

    let activeTab = 'all';
    let modalOpen = false;
    let currentProject = {};

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

    function openModal(proj: ProjectInterface) {
        currentProject = Object.assign({}, proj);
        modalOpen = true;
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
                        on:click|preventDefault={openModal(proj)}
                    >
                        <img
                            class="object-cover w-full h-full shadow-sm"
                            src={proj.img[0]}
                            alt={proj.title + ' image'}
                        />
                    </a>
                    <div
                        class="relative flex flex-col items-start w-full px-6 bg-gray-200 border border-t-0 border-gray-400 dark:bg-gray-700 py-7 rounded-b-2xl"
                    >
                        <div
                            class="absolute top-0 flex items-center w-auto -mt-3 text-xs font-medium leading-none text-white uppercase"
                        >
                            <span class="bg-blue-500 px-3 py-1.5 rounded-full"
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
                                <span>{$t('home.project.modal.visit')}</span>
                            </a>
                            <button
                                class="inline-block mx-1 text-green-800 border-green-600 btn hover:bg-green-700 dark:text-green-400 dark:border-green-400"
                                type="button"
                                on:click|preventDefault={openModal(proj)}
                            >
                                <i class="fas fa-at" />
                                <span>{$t('home.project.modal.moreInfo')}</span>
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

    <!-- project modal -->
    <!-- <div
                            class="fixed inset-0 z-20 w-full h-full overflow-y-auto duration-300 bg-black bg-opacity-50"
                            x-show="modal"
                            x-transition:enter="transition duration-300"
                            x-transition:enter-start="opacity-0"
                            x-transition:enter-end="opacity-100"
                            x-transition:leave="transition duration-300"
                            x-transition:leave-start="opacity-100"
                            x-transition:leave-end="opacity-0"
                        >
                            <div
                                class="relative mx-2 my-10 mt-20 opacity-100 sm:w-3/4 md:w-1/2 sm:mx-auto"
                            >
                                <div
                                    class="relative z-20 text-gray-900 bg-white rounded-md shadow-lg dark:bg-gray-700 dark:text-white"
                                    @click.away="modal = false"
                                    x-show="modal"
                                    x-transition:enter="transition transform duration-300"
                                    x-transition:enter-start="scale-0"
                                    x-transition:enter-end="scale-100"
                                    x-transition:leave="transition transform duration-300"
                                    x-transition:leave-start="scale-100"
                                    x-transition:leave-end="scale-0"
                                >
                                    <header
                                        class="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-600 dark:text-white"
                                    >
                                        <h2
                                            class="font-semibold capitalize small-caps"
                                            x-text="proj.title"
                                        >
                                            .
                                        </h2>
                                        <button
                                            class="p-2 text-red-600 focus:outline-none dark:text-red-500 hover:text-red-700 dark:hover:text-red-600"
                                            @click.prevent="modal = false"
                                        >
                                            <svg
                                                class="fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewbox="0 0 18 18"
                                            >
                                                <path
                                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </header>
                                    <main class="p-2 text-center">
                                        <article
                                            x-data="{                                              currentIndex: 1,                                              back() {                                                  if (this.currentIndex > 1) {                                                      this.currentIndex = this.currentIndex - 1;                                                  }                                              },                                              next() {                                                  if (this.currentIndex < this.proj.img.length) {                                                      this.currentIndex = this.currentIndex + 1;                                                  } else if (this.currentIndex <= this.proj.img.length){                                                      this.currentIndex = this.proj.img.length - this.currentIndex + 1                                                  }                                              },                                          }"
                                            class="relative flex flex-shrink-0 w-full overflow-hidden shadow-2xl"
                                        >
                                            <div
                                                class="absolute z-20 px-2 text-sm text-center text-white bg-gray-600 rounded-full top-5 right-5"
                                            >
                                                <span
                                                    x-text="currentIndex"
                                                ></span
                                                >/
                                                <span
                                                    x-text="proj.img ? proj.img.length : 0"
                                                ></span>
                                            </div>
                                        <template
                                                x-for="(image, index) in proj.img"
                                            >
                                                <figure
                                                    class="h-96"
                                                    x-show="currentIndex == index + 1"
                                                    x-transition:enter="transition transform duration-300"
                                                    x-transition:enter-start="opacity-0"
                                                    x-transition:enter-end="opacity-100"
                                                    x-transition:leave="transition transform duration-300"
                                                    x-transition:leave-start="opacity-100"
                                                    x-transition:leave-end="opacity-0"
                                                >
                                                    <img
                                                        :src="image"
                                                        alt="Image"
                                                        class="absolute inset-0 z-10 object-cover w-full h-full rounded opacity-[.95]"
                                                    />
                                                </figure>
                                            </template>
                                            <button
                                                @click.prevent="back()"
                                                class="absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md left-14 top-1/2 w-11 h-11 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                <svg
                                                    class="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewbox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2.5"
                                                        d="M15 19l-7-7 7-7"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <button
                                                @click.prevent="next()"
                                                class="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md right-14 rtl:!left-14 top-1/2 w-11 h-11 hover:bg-gray-200"
                                            >
                                                <svg
                                                    class="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewbox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2.5"
                                                        d="M9 5l7 7-7 7"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </article>
                                    </main>
                                    <footer class="flex justify-center p-2">
                                        <button
                                            class="w-32 p-2 font-semibold text-white transition-all duration-300 bg-red-500 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring hover:shadow-none"
                                            @click.prevent="modal = false"
                                            x-text="$t('home.project.back')"
                                        ></button>
                                    </footer>
                                </div>
                            </div>
                        </div> -->
</div>
