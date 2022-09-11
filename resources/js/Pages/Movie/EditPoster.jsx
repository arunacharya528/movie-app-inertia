import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';
import moment from 'moment';

export default function Edit(props) {

    const { data, setData, post, processing, errors } = useForm({
        poster: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('movie.updatePoster', [props.movie.id]));
    };


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <form onSubmit={submit}>

                <div className="text-2xl text-black font-bold py-5">Edit Poster</div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="block">
                        <InputLabel value="Old Poster" />
                        <img src={`${props.ziggy.url}/storage/${props.movie.poster}`} className="h-72 w-auto rounded-box mx-auto" />
                    </div>
                    <div>
                        <InputLabel forInput="poster" value="New Poster" />

                        <div className="block">
                            {
                                data.poster !== null ?
                                    <img src={URL.createObjectURL(data.poster)} className="h-72 w-auto rounded-box mx-auto" />
                                    : ''
                            }
                        </div>
                        <TextInput
                            type="file"
                            name="poster"
                            className="mt-1 block w-full"
                            handleChange={(e) => {
                                setData(e.target.name, e.target.files[0])
                            }}
                        />

                        <InputError message={errors.poster} className="mt-2" />
                    </div>
                </div>

                <div className="flex space-x-3 items-center mt-4">
                    <PrimaryButton className="" disabled={processing} >
                        Update
                    </PrimaryButton>
                    <Link href={route('movie.show', props.movie.id)} className="btn btn-sm">Cancel</Link>
                </div>

            </form>

        </AuthenticatedLayout>
    );
}
