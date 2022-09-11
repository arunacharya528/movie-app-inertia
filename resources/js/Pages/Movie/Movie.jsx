import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

import moment from 'moment';
import { MoviePublishToggle } from '@/components/MoviePublishToggle';

export default function User(props) {

    const MovieDestroyForm = ({ id }) => {
        const { delete: destroy } = useForm()

        const submit = (e) => {
            e.preventDefault();
            destroy(route('movie.destroy', id));
        };

        return (
            <form onSubmit={submit}>
                <button type='submit' className="btn btn-ghost">Delete</button>
            </form>
        );
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <div className="pb-5 flex justify-between">

                <Link className='btn' href={route('movie.create')}>Add movie</Link>
                <div className="grow flex justify-end space-x-3">
                    <Link className='btn' href={route('movie.index', { 'published': 'true' })}>Published Movies</Link>
                    <Link className='btn' href={route('movie.index')}>All Movies</Link>
                </div>
            </div>
            <div className=" overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Release Date</th>
                            <th>No of Favourites</th>
                            <th>Publish</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {props.movies.map((movie, index) =>
                            <tr>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="w-64 whitespace-pre-wrap">
                                        {movie.title}
                                    </div>
                                </td>
                                <td>{moment(movie.release_date).format("Y-M-d")}</td>
                                <td>{movie.favourites_count}</td>
                                <td>
                                    <MoviePublishToggle published={movie.published} id={movie.id} />
                                </td>
                                <td >
                                    <div className="flex space-x-3">
                                        <Link href={route('movie.show', movie.id)} className="btn btn-ghost">View</Link>
                                        <Link href={route('movie.edit', movie.id)} className="btn btn-ghost">Edit</Link>
                                        <MovieDestroyForm id={movie.id} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div></div>
            {/* </div> */}
        </AuthenticatedLayout>
    );
}
