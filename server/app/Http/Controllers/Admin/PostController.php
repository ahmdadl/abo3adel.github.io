<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Post;
use App\Tag;
use Illuminate\Http\Request;
use Storage;
use Str;

class PostController extends Controller
{
    public const UploadDIr = 'public/posts';

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $res = (object) $request->validated();

        // upload image
        $res->img = Str::replaceFirst(
            'public',
            '',
            $res->img->store(self::UploadDIr)
        );

        // unset tags from array
        $tags = $res->tags;
        unset($res->tags);

        // save post
        $post = Post::create((array) $res + ['user_id' => auth()->id() ?? 2]);

        // sync tags
        $post->tags()->sync(
            Tag::whereIn('slug', $tags)->get()
        );

        $post->loadMissing('tags');
        return response()->json($post, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, Post $post)
    {
        $res = (object) $request->validated();

        // if user add new images
        if (isset($res->img)) {
            // delete old image
            Storage::delete('public' . $post->img);

            // upload new image
            $res->img = Str::replaceFirst(
                'public',
                '',
                $res->img->store(self::UploadDIr)
            );
        }

        // save tags for later
        if (isset($res->tags)) {
            $tags = $res->tags;
            unset($res->tags);
        }

        // update post
        $post->update((array) $res);

        // sync tags
        if (isset($res->tags)) {
            $post->tags()->sync(
                Tag::whereIn('slug', $tags)->get()
            );
        }

        $post->loadMissing('tags');
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // delete image
        Storage::delete('public' . $post->img);

        $post->delete();
        return response()->noContent();
    }
}
