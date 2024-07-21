// resources/js/Pages/Jadwal/Create.jsx

import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, kelas, mapels }) {
    const { csrf_token } = usePage().props;
    const { data, setData, post, errors } = useForm({
        kelas_id: '',
        mapel_id: '',
        jam_masuk: '',
        jam_keluar: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('jadwal.store'), {
            ...data,
            _token: csrf_token,
        });
    }

    return (
        <AuthenticatedLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Data Jadwal</h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="kelas_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Kelas
                                    </label>
                                    <select
                                        id="kelas_id"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.kelas_id}
                                        onChange={(e) => setData('kelas_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelas.map((kelas) => (
                                            <option key={kelas.id} value={kelas.id}>{kelas.nama_kelas}</option>
                                        ))}
                                    </select>
                                    {errors.kelas_id && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.kelas_id}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="mapel_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mata Pelajaran
                                    </label>
                                    <select
                                        id="mapel_id"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.mapel_id}
                                        onChange={(e) => setData('mapel_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Mata Pelajaran</option>
                                        {mapels.map((mapel) => (
                                            <option key={mapel.id} value={mapel.id}>{mapel.nama_mapel}</option>
                                        ))}
                                    </select>
                                    {errors.mapel_id && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.mapel_id}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="jam_masuk" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Jam Masuk
                                    </label>
                                    <input
                                        id="jam_masuk"
                                        type="time"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.jam_masuk}
                                        onChange={(e) => setData('jam_masuk', e.target.value)}
                                        required
                                    />
                                    {errors.jam_masuk && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.jam_masuk}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="jam_keluar" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Jam Keluar
                                    </label>
                                    <input
                                        id="jam_keluar"
                                        type="time"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.jam_keluar}
                                        onChange={(e) => setData('jam_keluar', e.target.value)}
                                        required
                                    />
                                    {errors.jam_keluar && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.jam_keluar}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    >
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
