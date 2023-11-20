import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white shadow-sm sm:rounded-lg p-6 mb-4 text-gray-900 block">You're logged in!</div>
        <div className="overflow-hidden shadow-sm sm:rounded-lg justify-between">
           

            <Link  href={route('single-player')} className="rounded-lg text-2xl p-8 mb-4 bg-blue-500 text-white border-none block">Singleplayer: guess which words were used to generate the image!</Link>
            <a href={'/game'} className="rounded-lg text-2xl p-8 bg-blue-500 text-white border-none block">Multiplayer: generate an image and have others guess your words!</a>
        </div>
    </div>
</div>
        </AuthenticatedLayout>
    );
}
