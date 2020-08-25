<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Comment;
use App\Http\Controllers\Controller;
use App\Post;
use App\Project;
use App\Tag;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $posts = Post::count('id');
        $projects = Project::count('id');
        $comments = Comment::count('id');
        $tags = Tag::count('id');
        $categories = Category::count('id');

        return response()->json(compact(
            'posts',
            'projects',
            'comments',
            'tags',
            'categories'
        ));
    }
}