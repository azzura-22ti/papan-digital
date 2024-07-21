import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, gurus }) {
    const { data, setData, post, errors } = useForm({
        nama_mapel: '',
        guru_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_mapel', data.nama_mapel);

        formData.append('guru_id', data.guru_id);

        post(route('mapel.store'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                window.location.href = route('mapel.index');
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Data Mata Pelajaran</h2>}
        >
            <Head title="Tambah Data Mata Pelajaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label htmlFor="nama_mapel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Mapel
                                    </label>
                                    <input
                                        id="nama_mapel"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.nama_mapel}
                                        onChange={(e) => setData('nama_mapel', e.target.value)}
                                        required
                                    />
                                    {errors.nama_mapel && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.nama_mapel}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="guru_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Guru Pengajar
                                    </label>
                                    <select
                                        id="guru_id"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.guru_id}
                                        onChange={(e) => setData('guru_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Guru</option>
                                        {gurus.map((guru) => (
                                            <option key={guru.id} value={guru.id}>{guru.nama_guru}</option>
                                        ))}
                                    </select>
                                    {errors.guru_id && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.guru_id}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        href={route('mapel.index')}
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
