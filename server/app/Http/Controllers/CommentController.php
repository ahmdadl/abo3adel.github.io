<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Post $post)
    {
        return response()->json(
            Comment::where('post_id', $post->id)->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Post $post)
    {
        $req = request()->validate([
            'user_name' => 'required|string|min:5|max:50',
            'user_mail' => 'required|email|min:5|max:255',
            'body' => 'required|string|min:10',
        ]);

        $comment = $post->comments()->create($req);

        return response()->json($comment, 201);
    }
}
