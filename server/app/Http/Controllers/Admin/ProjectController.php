<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectStoreRequest;
use App\Project;
use App\Tag;
use Illuminate\Http\Request;
use Str;

class ProjectController extends Controller
{
    public const UploadPath = 'public/projects';

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectStoreRequest $request)
    {
        $res = (object) $request->validated();

        $tags = $res->tags;

        // upload images
        $img = [];
        foreach ($res->img as $i) {
            $img[] = Str::replaceFirst(
                'public',
                '',
                $i->store(self::UploadPath)
            );
        }


        unset($res->tags);
        $res->img = $img;
        $project = Project::create((array) $res);

        $tags = Tag::whereIn('slug', $tags)->get();
        $project->tags()->sync($tags);

        $project->loadMissing('tags');
        return response()->json($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
