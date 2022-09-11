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

    const { data, setData, put, processing, errors } = useForm({
        title: props.movie.title,
        description: props.movie.description,
        release_date: moment(props.movie.release_date).format('yyyy-MM-DD')
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('movie.update', [props.movie.id]));
    };


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <form onSubmit={submit}>
                <div className="text-2xl text-black font-bold py-5">Edit Movie</div>

                <div>
                    <InputLabel forInput="title" value="Title" />

                    <TextInput
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="description" value="Description" />

                    <TextArea
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="date" value="Release Date" />

                    <TextInput
                        type="date"
                        name="release_date"
                        value={data.release_date}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.release_date} className="mt-2" />
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
