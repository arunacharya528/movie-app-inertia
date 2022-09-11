<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $movies = Movie::withCount('favourites');
        if ($request->query('published')) {
            $movies = $movies->where('published', true);
        }
        return Inertia::render('Movie/Movie', [
            'movies' => $movies->orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Movie/Add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => ['required'],
            'poster' => 'required'
        ]);

        DB::beginTransaction();

        try {
            $path = Storage::disk('public')->put("", $request->file('poster'));
            if (!Storage::disk('public')->exists($path)) {
                throw new Exception("File not saved");
            }
            Movie::create([
                'title' => $request->title,
                'description' => $request->description,
                'release_date' => $request->date,
                'poster' => $path
            ]);
        } catch (\Throwable $th) {
            error_log($th->getMessage());
            DB::rollBack();
        }
        DB::commit();

        return redirect(route('movie.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inertia::render('Movie/View', ['movie' => Movie::find($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Movie/Edit', ['movie' => Movie::find($id)]);
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

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => 'required'
        ]);

        $movie = Movie::find($id);
        $movie->update($request->all());

        return redirect(route('movie.show', $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Movie::destroy($id);
    }

    /**
     * Toggle between published state of the movie
     * if it is unpublished then it will publish and vice-versa
     *
     * @param int $id
     */
    public function togglePublishedState($id)
    {
        $movie = Movie::find($id);
        $movie->published = !$movie->published;
        $movie->save();
        return redirect(route('movie.index'));
    }


    public function editPoster($id)
    {
        return Inertia::render('Movie/EditPoster', ['movie' => Movie::find($id)]);
    }


    public function updatePoster(Request $request, $id)
    {
        $request->validate([
            'poster' => 'required'
        ]);

        DB::beginTransaction();

        try {
            $path = Storage::disk('public')->put("", $request->file('poster'));
            if (!Storage::disk('public')->exists($path)) {
                throw new Exception("File not saved");
            }
            $movie = Movie::find($id);
            $movie->update([
                'poster' => $path
            ]);
        } catch (\Throwable $th) {
            error_log($th->getMessage());
            DB::rollBack();
        }
        DB::commit();
        return redirect(route('movie.show', $id));
    }
}
