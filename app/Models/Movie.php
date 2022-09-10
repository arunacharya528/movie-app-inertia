<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'release_date', 'poster'];

    public function favourites(){
        return $this->hasMany(Favourite::class,'movie_id');
    }

}
