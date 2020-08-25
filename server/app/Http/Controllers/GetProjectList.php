<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class GetProjectList extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return response()->json(
            Project::latest()->get()
        );
    }
}
