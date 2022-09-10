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
    public function index()
    {

        return Inertia::render('Movie/Movie', ['movies' => Movie::get()]);
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
            'release_date' => ['required']
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
            return response()->json(['error' => $th->getMessage()], 500);
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
