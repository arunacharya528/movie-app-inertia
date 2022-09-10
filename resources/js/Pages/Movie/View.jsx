import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';
import moment from 'moment';

export default function View(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movie Detail</h2>}
        >
            <Head title="Movie Detail" />

            <div className="pb-5">
                <Link href={route('movie.edit', props.movie.id)} className="btn btn-ghost">Edit</Link>
            </div>
            <div className='flex flex-col space-y-5'>
                <div className="block">
                    <img src={`${props.ziggy.url}/storage/${props.movie.poster}`} className="h-72 w-auto rounded-box mx-auto" />
                </div>
                <div className='text-center'>
                    <div className=" font-bold text-xl">{props.movie.title}</div>
                    <div className=''>{moment(props.movie.release_date).format("Y MMMM D")}</div>
                </div>

                <div>
                    {props.movie.description}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
