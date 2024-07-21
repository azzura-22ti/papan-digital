import React, { useState, useEffect } from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, berita }) {
    const { csrf_token } = usePage().props;
    const { data, setData, put, errors } = useForm({
        judul: berita.judul || '',
        deskripsi: berita.deskripsi || '',
        video_path: null,
        image_path: null
    });

    const [videoPreview, setVideoPreview] = useState(berita.video_path ? `/storage/${berita.video_path}` : '');
    const [imagePreview, setImagePreview] = useState(berita.image_path ? `/storage/${berita.image_path}` : '');

    useEffect(() => {
        if (data.video_path) {
            setVideoPreview(URL.createObjectURL(data.video_path));
        } else if (berita.video_path) {
            setVideoPreview(`/storage/${berita.video_path}`);
        }
    }, [data.video_path, berita.video_path]);

    useEffect(() => {
        if (data.image_path) {
            setImagePreview(URL.createObjectURL(data.image_path));
        } else if (berita.image_path) {
            setImagePreview(`/storage/${berita.image_path}`);
        }
    }, [data.image_path, berita.image_path]);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('_token', csrf_token);

        if (data.judul) formData.append('judul', data.judul);
        if (data.deskripsi) formData.append('deskripsi', data.deskripsi);
        if (data.video_path instanceof File) formData.append('video_path', data.video_path);
        if (data.image_path instanceof File) formData.append('image_path', data.image_path);

        put(route('berita.update', berita.id), formData, {
            onSuccess: () => {
                setData({
                    judul: berita.judul || '',
                    deskripsi: berita.deskripsi || '',
                    video_path: null,
                    image_path: null
                });
            }
        });
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Berita</h2>}>
            <Head title="Edit Berita" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
                                    <input
                                        type="text"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.judul && <div className="text-red-600 mt-1">{errors.judul}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                                    <textarea
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.deskripsi && <div className="text-red-600 mt-1">{errors.deskripsi}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video</label>
                                    {videoPreview && (
                                        <video controls className="h-48 mb-4 rounded-md shadow-sm">
                                            <source src={videoPreview} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setData('video_path', e.target.files[0])}
                                        className="mt-1 block w-full text-gray-900 dark:text-gray-300 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.video_path && <div className="text-red-600 mt-1">{errors.video_path}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gambar</label>
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="h-48 mb-4 object-cover rounded-md shadow-sm" />
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setData('image_path', e.target.files[0])}
                                        className="mt-1 block w-full text-gray-900 dark:text-gray-300 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.image_path && <div className="text-red-600 mt-1">{errors.image_path}</div>}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Link href={route('berita.index')} className="mr-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 active:bg-gray-500 dark:active:bg-gray-800 transition ease-in-out duration-150">
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
