<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:5|max:255',
            'body' => 'required|string|min:20',
            'img' => 'sometimes|image|mimes:png,jpeg,jpg|max:512',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'sometimes|array',
            'tags.*' => 'sometimes|string|exists:tags,slug',
        ];
    }
}
