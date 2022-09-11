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


        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
                {props.movies.map((movie, index) =>
                    <MovieThumbnail props={props} movie={movie} />
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
