import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, beritas }) {
    const { data, setData, post, errors } = useForm({
        judul: '',
        deskripsi: '',
        video_path: null,
        image_path: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', data.judul);
        formData.append('deskripsi', data.deskripsi);
        formData.append('video_path', data.video_path);
        formData.append('image_path', data.image_path);

        post(route('berita.store'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                window.location.href = route('berita.index');
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Data Berita</h2>}
        >
            <Head title="Tambah Data Berita" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label htmlFor="judul" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Judul
                                    </label>
                                    <input
                                        id="judul"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        required
                                    />
                                    {errors.judul && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.judul}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="deskripsi"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        required
                                    />
                                    {errors.deskripsi && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.deskripsi}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="video_path" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Video
                                    </label>
                                    <input
                                        id="video_path"
                                        type="file"
                                        accept="video/mp4,video/x-m4v,video/*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setData('video_path', e.target.files[0])}
                                    />
                                    {errors.video_path && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.video_path}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image_path" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gambar
                                    </label>
                                    <input
                                        id="image_path"
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setData('image_path', e.target.files[0])}
                                    />
                                    {errors.image_path && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.image_path}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        href={route('berita.index')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
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
