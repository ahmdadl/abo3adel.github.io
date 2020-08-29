<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => ['api', 'auth:api'],
    'prefix' => 'auth'

], function () {

    Route::post('login', 'Auth\LoginController@login')->withoutMiddleware(['auth:api']);
    Route::post('logout', 'Auth\LoginController@logout');
    Route::post('refresh', 'Auth\LoginController@refresh')->withoutMiddleware(['auth:api']);
    Route::get('user', 'Auth\UserController@current');
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::patch('settings/profile', 'Settings\ProfileController@update');
    Route::patch('settings/password', 'Settings\PasswordController@update');
});

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('register', 'Auth\RegisterController@register');

    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::post('email/verify/{user}', 'Auth\VerificationController@verify')->name('verification.verify');
    Route::post('email/resend', 'Auth\VerificationController@resend');

    Route::post('oauth/{driver}', 'Auth\OAuthController@redirectToProvider');
    Route::get('oauth/{driver}/callback', 'Auth\OAuthController@handleProviderCallback')->name('oauth.callback');
});

// post
Route::get('post', 'PostController@index');
Route::get('post/popular', 'PostController@loadPopular');
Route::get('post/find', 'PostController@search');

Route::get('post/{post}', 'PostController@show');

// comments
Route::get('/post/{post}/comments', 'CommentController@index');
Route::post('/post/{post}/comments', 'CommentController@store');

// categories
Route::get('categories', 'CategoryController@index');
Route::get('categories/{category}/posts', 'CategoryController@listPosts');

// projects
Route::get('projects', 'GetProjectList');

// admin routes
Route::group(['prefix' => 'root', 'namespace' => 'Admin'], function () {
    Route::get('dashboard', 'Dashboard');

    // project
    Route::prefix('projects')->group(function () {
        Route::post('', 'ProjectController@store');
        Route::patch(
            '/{project}',
            'ProjectController@update'
        );
        Route::delete(
            '/{project}',
            'ProjectController@destroy'
        );
    });

    // tags
    Route::resource('tags', 'TagController');

    // comments
    Route::get('comments', 'GetCommentList');
    Route::delete('comments/{comment}', 'DestroyComment');

    // categories
    Route::resource('categories', 'CategoryController');

    Route::resource('posts', 'PostController', [
        'except' => ['index', 'show']
    ]);
});
