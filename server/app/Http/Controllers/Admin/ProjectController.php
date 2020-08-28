<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectStoreRequest;
use App\Project;
use App\Tag;
use Illuminate\Http\Request;
use Storage;
use Str;

class ProjectController extends Controller
{
    public const UploadPath = 'static/img/projects/';

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
                self::UploadPath,
                '',
                Storage::disk('custom')->put(self::UploadPath, $i)
            );
        }

        unset($res->tags);
        $res->img = $img;
        $project = Project::create((array) $res);

        $tags = Tag::whereIn('slug', $tags)->get();
        $project->tags()->sync($tags);

        $project->loadMissing('tags');
        return response()->json($project, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(
        ProjectStoreRequest $request,
        Project $project
    ) {
        $res = (object) $request->validated();

        $img = [];
        // check if user changed images
        if (isset($res->img) && is_array($res->img)) {
            // delete old images
            foreach ($project->img as $g) {
                // unlink(storage_path('app/public' . $g));
                // dump($g);
                Storage::disk('custom')->delete(
                    self::UploadPath . $g
                );
            }

            // upload new images
            foreach ($res->img as $i) {
                $img[] = Str::replaceFirst(
                    self::UploadPath,
                    '',
                    Storage::disk('custom')->put(self::UploadPath, $i)
                );
            }
            $res->img = $img;
        }

        if (isset($res->tags)) {
            $tags = $res->tags;
            unset($res->tags);
        }


        $project->update((array) $res);

        if (isset($tags)) {
            // sync tags
            $tags = Tag::whereIn('slug', $tags)->get();
            $project->tags()->sync($tags);
        }


        // $project = Project::with('tags')->find($project->id);
        $project->loadMissing('tags');
        return response()->json($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        if (sizeof($project->img)) {
            // delete all images
            foreach ($project->img as $img) {
                Storage::disk('custom')->delete(
                    self::UploadPath . $img
                );
            }
        }

        if (sizeof($project->tags)) {
            // remove all pivot tags
            $project->tags()->detach($project->tags->pluck('id'));
        }

        $project->delete();

        return response()->noContent();
    }
}
