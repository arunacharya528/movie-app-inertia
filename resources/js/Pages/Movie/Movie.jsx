import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

import moment from 'moment';

export default function User(props) {
    // console.log(props)

    const MoviePoster = ({ movie }) => {
        const [isPosterLarge, makePosterLarge] = useState(false);

        return (
            <div className="relative w-full" onMouseEnter={e => makePosterLarge(true)} onMouseLeave={e => makePosterLarge(false)}>
                <img src={`${props.ziggy.url}/storage/${movie.poster}`} className="h-16 w-auto rounded-box" />
                {
                    isPosterLarge ?
                        <div className="absolute right-0  top-0 z-10">
                            <img src={`${props.ziggy.url}/storage/${movie.poster}`} className="!w-96 h-auto rounded-box" />
                        </div>
                        : ''
                }
            </div>
        );
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Release Date</th>
                                <th>Poster</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.movies.map((movie, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{movie.title}</td>
                                    <td>{moment(movie.release_date).format("Y-m-d")}</td>
                                    <td className='w-96'>
                                        <MoviePoster movie={movie} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
