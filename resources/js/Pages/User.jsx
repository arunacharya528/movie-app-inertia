import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

import moment from 'moment';

export default function User(props) {
    console.log(props)
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Users</h2>}
        >
            <Head title="All users" />

            {console.log(props)}


            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.users.map((user, index) =>
                                <tr>
                                    <th>{index}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
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
