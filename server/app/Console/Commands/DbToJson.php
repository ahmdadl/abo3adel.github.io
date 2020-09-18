<?php

namespace App\Console\Commands;

use App\Category;
use App\Http\Controllers\CategoryController;
use App\Post;
use App\Project;
use DB;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;
use Storage;

class DbToJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:json';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'serialize database contents to json files';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->warn('Deleting old files');
        Storage::disk('custom')->delete(
            Storage::disk('custom')->allFiles('data/')
        );
        $this->info('Deleted Successfully');
        $this->warn(str_repeat('-', 15));

        DB::beginTransaction();

        $this->savePosts();

        $this->saveData(Project::latest()->get(), 'projects');

        $this->saveData(
            Category::withCount('posts')
                ->orderByDesc('posts_count')
                ->get(),
            'categories'
        );

        $this->saveData(
            Post::withCount('comments')
                ->latest()
                ->orderByDesc('comments_count')
                ->limit(4)
                ->get(),
            'popular'
        );

        // save fetched data
        $this->saveFetchedData(
            Post::all(),
            'posts/index'
        );

        $this->saveFetchedData(
            Post::with('comments')
                ->latest()
                ->get(),
            'posts/comments'
        );

        $this->saveFetchedData(
            Category::with('posts')
                ->latest()
                ->get(),
            'categories/posts'
        );

        DB::commit();
    }

    private function savePosts()
    {
        $this->warn('Retriving posts');

        $posts = Post::latest()->paginate();
        foreach (range(1, $posts->lastPage()) as $i) {
            Storage::disk('custom')->put('data/' . 'posts' . '/' . $i . '.json', json_encode(Post::paginate(
                null,
                ['*'],
                'page',
                $i
            )));
        }

        $this->info("posts: Done -> ($i pages)");
        $this->warn(str_repeat('-', 20));
    }

    private function saveData(
        Collection $collection,
        string $dir
    ): void {
        $this->warn('Retriving ' . $dir);

        $i = 1;
        foreach ($collection->chunk(15) as $chunk) {
            Storage::disk('custom')->put('data/' . $dir . '/' . $i . '.json', json_encode($chunk));
            $i++;
        }

        $this->info($dir . ": Done -> (" . ($i - 1) . " pages)");
        $this->warn(str_repeat('-', 20));
    }

    private function saveFetchedData(
        Collection $collection,
        string $dir,
        string $nameAttr = 'slug'
    ): void {
        $this->warn('Retriving ' . $dir);

        foreach ($collection as $collect) {
            Storage::disk('custom')->put('data/' . $dir . '/' . $collect->{$nameAttr} . '.json', json_encode($collect));
        }

        $this->info($dir . ": Done -> (" . ($collection->count()) . " pages)");
        $this->warn(str_repeat('-', 20));
    }
}
