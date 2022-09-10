import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
export default function User(props) {

    const [from, setFrom] = useState(props.from)
    const [to, setTo] = useState(props.to)

    const handleDateChange = (type, value) => {
        switch (type) {
            case 'from':
                setFrom(value)
                break;
            case 'to':
                setTo(value)
                break;
        }
    }

    const filter = () => {
        var query = ''
        if (from !== null) {
            query = `from=${from}`
        }

        if (to !== null) {
            query += `&to=${to}`
        }

        document.location.search = query
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Users</h2>}
        >
            <Head title="All users" />

            <div className="container mx-auto">

                <div className='flex space-x-5 pb-5'>
                    <div className='w-64'>
                        <InputLabel forInput="from" value="From" />

                        <TextInput
                            type="date"
                            name="from"
                            className="mt-1 block w-full"
                            value={from}
                            handleChange={(e) => {
                                handleDateChange('from', e.target.value)
                            }}
                        />
                    </div>
                    <div className='w-64'>
                        <InputLabel forInput="to" value="To" />

                        <TextInput
                            type="date"
                            name="to"
                            className="mt-1 block w-full"
                            value={to}
                            handleChange={(e) => {
                                handleDateChange('to', e.target.value)
                            }}
                        />
                    </div>

                    <button className="btn btn-primary self-end" onClick={filter}>Filter</button>

                    <button className="btn btn-primary self-end" onClick={() => { document.location.search = '' }}>Clear</button>

                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Favourite movies</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.users.map((user, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className='w-64 whitespace-pre-wrap space-y-2'>
                                        {
                                            user.favourites.map((favourite, index) =>

                                                <>
                                                    {
                                                        favourite.movie ?
                                                            <div key={index} className="bg-primary p-3 rounded-md">{favourite.movie.title}
                                                                <div className="font-bold">{moment(favourite.movie.release_date).format("yyyy-MM-DD")}</div>
                                                            </div>
                                                            : ''
                                                    }
                                                </>
                                            )
                                        }
                                    </td>
                                    <td>{moment(user.created_at).calendar()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
