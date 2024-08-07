import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        nama_guru: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('guru.store'), {
            onSuccess: () => {
                window.location.href = route('guru.index'); // Redirect or show success message
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Data Guru</h2>}
        >
            <Head title="Tambah Data Guru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nama_guru" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Guru
                                    </label>
                                    <input
                                        id="nama_guru"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.nama_guru}
                                        onChange={(e) => setData('nama_guru', e.target.value)}
                                        required
                                    />
                                    {errors.nama_guru && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.nama_guru}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        href={route('guru.index')}
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
