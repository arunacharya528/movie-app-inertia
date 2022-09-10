import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import moment from 'moment';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import Guest from '@/Layouts/GuestLayout';
import NonAuthenticated from '@/Layouts/NonAuthenticatedLayout';
import axios from 'axios';
import { MovieThumbnail } from '@/components/MovieThumbanil';
export default function Home(props) {

    const Main = () => {

        // const LikeButton = ({ movie }) => {

        //     const { post, delete: destroy } = useForm({
        //         movie_id: movie.id
        //     });


        //     const [liked, setLike] = useState(false);

        //     useEffect(() => {
        //         setLike(movie.favourites.length > 0)
        //     }, [movie]);

        //     const handleLike = () => {
        //         post(route('favourite.store'))
        //     }

        //     const handleUnlike = (id) => {
        //         destroy(route('favourite.destroy', id))
        //     }


        //     return (
        //         <>
        //             {props.auth.user !== null ?

        //                 liked ?
        //                     <div class="tooltip z-10" data-tip="Remove from favourite">
        //                         <button className={"btn btn-ghost bg-red-500 btn-square text-white"} onClick={e => handleUnlike(movie.favourites[0].id)}>
        //                             {movie.favourites_count} Like
        //                         </button>
        //                     </div>
        //                     :
        //                     <div class="tooltip z-10" data-tip="Add to favourite">
        //                         <button className={"btn btn-ghost btn-square text-white"} onClick={handleLike}>
        //                             {movie.favourites_count} Like
        //                         </button>
        //                     </div>
        //                 :
        //                 <div class="tooltip z-10" data-tip="Login to add to cart">
        //                     <button className={"btn btn-ghost btn-square text-white"} >
        //                         {movie.favourites_count} Like
        //                     </button>
        //                 </div>
        //             }
        //         </>
        //     );
        // }

        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
                {props.movies.map((movie, index) =>
                    <MovieThumbnail props={props} movie={movie} />
                    // <div className="relative ">
                    //     <img src={`${props.ziggy.url}/storage/${movie.poster}`} className="!w-96 h-auto rounded-box" />
                    //     <div className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500/90 via-indigo-500/50 text-white to-transparent rounded-b-box p-3 flex space-x-3">
                    //         <div key={index} className="font-bold text-md">{movie.title}</div>
                    //         <div className="flex flex-col">
                    //             <LikeButton movie={movie} />
                    //             <span>
                    //                 {moment(movie.release_date).format("yyyy")}
                    //             </span>
                    //         </div>
                    //     </div>

                    // </div>
                )}
            </div>
        );
    }

    return (
        <>
            {
                props.auth.user !== null ?

                    <AuthenticatedLayout
                        auth={props.auth}
                        errors={props.errors}
                        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
                    >
                        <div className="container mx-auto">
                            <Main />
                        </div>
                    </AuthenticatedLayout>
                    :

                    <NonAuthenticated
                        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
                    >
                        <Head title="Home" />

                        <div className="container mx-auto">
                            <Main />
                        </div>
                    </NonAuthenticated>

            }

        </>
    );
}
