import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ auth, jadwals }) {
    const { csrf_token } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            Inertia.delete(route('jadwal.destroy', { jadwal: id }), {
                _token: csrf_token,
                onSuccess: () => {
                    // Optional: Implement refresh after delete
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Jadwal</h2>}>
            <Head title="Jadwal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Daftar Jadwal</h3>
                        </div>
                        <div>
                            <Link
                                href={route('jadwal.create')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                Tambah Jadwal
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
                                            Kelas
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mata Pelajaran
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Jam Masuk
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Jam Keluar
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {jadwals.map((jadwal, index) => (
                                        <tr key={jadwal.id} className="text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {jadwal.kelas.nama_kelas}
                                            </td>
                                            <td className="px-6 py-4">
                                                {jadwal.mapel.nama_mapel}
                                            </td>
                                            <td className="px-6 py-4">
                                                {jadwal.jam_masuk}
                                            </td>
                                            <td className="px-6 py-4">
                                                {jadwal.jam_keluar}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('jadwal.edit', { jadwal: jadwal.id })}
                                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(jadwal.id)}
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
