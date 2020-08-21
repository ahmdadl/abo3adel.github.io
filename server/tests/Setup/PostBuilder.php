<?php

namespace  Tests\Setup;

use App\Comment;
use App\Post;
use App\Tag;

class PostBuilder
{
    private int $amount = 1;
    private ?int $comment_amount = null;
    private ?int $tag_amount = null;

    public function amount(int $amount = 1): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function wCom(int $amount = 1): self
    {
        $this->comment_amount = $amount;

        return $this;
    }

    public function tag(int $amount = 1): self
    {
        $this->tag_amount = $amount;

        return $this;
    }

    public function create(array $attr = []): Post
    {
        $post = (factory(Post::class, $this->amount)
            ->create($attr))->last();

        if ($this->comment_amount) {
            $post->comments()->createMany(
                factory(Comment::class, $this->comment_amount)->raw([
                    'post_id' => $post->id
                ])
            );
        }

        if ($this->tag_amount) {
            $tags = factory(Tag::class, $this->tag_amount)->create();
            $tags->each(fn ($tag) => $tag->posts()->attach($post));
        }

        return $post;
    }

    public function raw(array $attr = []): array
    {
        return factory(Post::class)->raw($attr);
    }

    public function make(array $attr = []): Post
    {
        return new Post($this->raw());
    }
}
