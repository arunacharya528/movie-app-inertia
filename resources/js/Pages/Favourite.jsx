import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import moment from 'moment';

export default function Favourites(props) {

    const LikeButton = ({ movie, favouriteId }) => {

        const { post, delete: destroy } = useForm({
            movie_id: movie.id
        });

        const [liked, setLike] = useState(false);

        useEffect(() => {
            setLike(movie ? true : false)
        }, [movie]);

        const handleUnlike = (id) => {
            destroy(route('favourite.destroy', id))
        }


        return (
            <>
                <div class="tooltip z-10" data-tip="Remove from favourite">
                    <button className={"btn btn-ghost bg-red-500 btn-square text-white"} onClick={e => handleUnlike(favouriteId)}>
                        {movie.favourites_count} Like
                    </button>
                </div>

            </>
        );
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Favourites</h2>}
        >
            <Head title="Favourites" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table w-full">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Movie</th>
                                        <th>Release Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.favourites.map((favourite, index) =>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{favourite.movie.title}</td>
                                                <td>{moment(favourite.movie.release_date).format("yyyy-MM-DD")}</td>
                                                <td><LikeButton movie={favourite.movie} favouriteId={favourite.id} /></td>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
