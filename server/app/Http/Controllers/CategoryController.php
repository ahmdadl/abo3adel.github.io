<?php

namespace App\Http\Controllers;

use App\Category;
use App\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'cats' => Category::withCount('posts')
                ->orderByDesc('posts_count')
                ->get()
        ]);
    }

    public function listPosts(Category $category)
    {
        return response()->json([
            'posts' => Post::whereCategoryId($category->id)
                ->withCount('comments')
                ->latest()
                ->paginate()
        ]);
    }
}
