import React, { useState, useEffect } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, guru }) {
    const { csrf_token } = usePage().props;
    const { data, setData, put, errors } = useForm({
        nama_guru: guru.nama_guru || '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('_token', csrf_token);

        if (data.nama_guru) formData.append('nama_guru', data.nama_guru);

        put(route('guru.update', guru.id), formData, {
            onSuccess: () => {
                setData({
                    nama_guru: guru.nama_guru || '',
                });
            }
        });
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Guru</h2>}>
            <Head title="Edit Guru" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Guru</label>
                                    <input
                                        type="text"
                                        value={data.nama_guru}
                                        onChange={(e) => setData('nama_guru', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.nama_guru && <div className="text-red-600 mt-1">{errors.nama_guru}</div>}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Link href={route('guru.index')} className="mr-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 active:bg-gray-500 dark:active:bg-gray-800 transition ease-in-out duration-150">
                                        Kembali
                                    </Link>
                                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-700 active:bg-indigo-900 transition ease-in-out duration-150">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
