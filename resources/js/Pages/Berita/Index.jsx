import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ auth, beritas }) {
    const { csrf_token } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            Inertia.post(route('berita.destroy', { berita: id }), {
                _method: 'DELETE',
                _token: csrf_token
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Berita</h2>}
        >
            <Head title="Berita" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Daftar Berita</h3>
                        </div>
                        <div>
                            <Link href={route('berita.create')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Tambah Data
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Judul
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Deskripsi
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Video
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Gambar
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {beritas.map((berita, index) => (
                                        <tr key={berita.id} className="text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {berita.judul}
                                            </td>
                                            <td className="px-6 py-4">
                                                {berita.deskripsi}
                                            </td>
                                            <td className="px-6 py-4">
                                                {berita.video_path && (
                                                    <video controls className="h-20">
                                                        <source src={'/storage/' + berita.video_path} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {berita.image_path && (
                                                    <img src={'/storage/' + berita.image_path} alt="Preview" className="h-20 object-cover" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('berita.edit', { berita: berita.id })}
                                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(berita.id)}
                                                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
