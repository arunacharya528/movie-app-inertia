<?php

namespace App\Http\Controllers;

use App\Events\SendMail;
use App\Mail\FavouriteMail;
use App\Models\Favourite;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class FavouriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->role === 1) {
            return redirect('unauthorized');
        }
        $favourites = Favourite::with(['movie' => function ($query) {
            return $query->withCount('favourites');
        }])->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Favourite', ['favourites' => $favourites]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::user()->role === 1) {
            return redirect('unauthorized');
        }

        try {
            $user = User::find(Auth::user()->id);

            Favourite::create([
                'user_id' => Auth::user()->id,
                'movie_id' => $request->movie_id
            ]);

            $movie = Movie::find($request->movie_id);
            $mailData = [
                'name' => $user->name,
                'movieName' => $movie->title
            ];
            Mail::to($user['email'])->send(new FavouriteMail($mailData));
        } catch (\Throwable $th) {
            error_log($th);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function show(Favourite $favourite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function edit(Favourite $favourite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favourite $favourite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favourite $favourite)
    {
        if (Auth::user()->role === 1) {
            return redirect('unauthorized');
        }
        Favourite::destroy($favourite->id);
    }
}
