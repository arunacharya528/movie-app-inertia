import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';

export default function Add(props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        release_date: '',
        poster: ''
    });

    const [file, setfile] = useState({})

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleFileUpload = (e) => {
        setfile(e.target.files[0])
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('movie.store'));
    };


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movies</h2>}
        >
            <Head title="Movies" />

            <form onSubmit={submit}>
                <div className="text-2xl text-black font-bold py-5">Add movie</div>

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

                <div>
                    <InputLabel forInput="date" value="Poster" />

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

                <PrimaryButton className="mt-4" processing={processing}>
                    Save
                </PrimaryButton>

            </form>

        </AuthenticatedLayout>
    );
}
