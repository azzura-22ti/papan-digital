import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from 'react';
import NoLayout from "@/Layouts/NoLayout";
import "@/Layouts/Marque.css"; // Ensure this import is correct

export default function CombinedLayout({ jadwals, beritas }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentMarquee, setCurrentMarquee] = useState(0);
    const videoRefs = useRef([]);
    const layoutCount = 2; // Number of layouts to switch between

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % layoutCount);
        }, 30000); // Change slide every 20 seconds

        return () => clearInterval(interval);
    }, [layoutCount]);

    useEffect(() => {
        const marqueeInterval = setInterval(() => {
            setCurrentMarquee((prevMarquee) => (prevMarquee + 1) % beritas.length);
        }, 20000);

        return () => clearInterval(marqueeInterval);
    }, [beritas.length]);

    const leftJadwals = jadwals.slice(0, 4);
    const rightJadwals = jadwals.slice(4, 8);

    return (
        <NoLayout>
            <Head title="Papan" />
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
                <div className="w-full bg-teal-800 py-2 relative z-50">
                    <div className="flex justify-between items-center px-5 max-w-screen-lg mx-auto">
                        <Link href="/">
                            <img src='/storage/images/muda.png' alt='SMK MUDA' className="w-24 h-16 object-contain" />
                        </Link>
                        <div className="text-center flex-1 mx-4">
                            <p className="text-xl font-bold text-gray-100">SMK MUHAMMADIYAH 2 PEKANBARU</p>
                            <p className="text-xs font-light text-gray-400">Jl. KH. Ahmad Dahlan No.90, Kp. Melayu, Kec. Sukajadi, Kota</p>
                            <p className="text-xs font-light text-gray-400">Pekanbaru, Riau 28122</p>
                            <p className="text-xs font-light text-gray-400">https://www.smkmhd2pku.sch.id</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-1 p-5 space-x-4">
                            <div className="flex flex-col space-y-2 w-72">
                                {leftJadwals.map((jadwal) => (
                                    <div key={jadwal.id} className="bg-yellow-200 p-2 rounded-lg shadow-md">
                                        <p className="text-lg text-center font-bold mb-1">{jadwal.kelas?.nama_kelas || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">{jadwal.mapel?.nama_mapel || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">Guru: {jadwal.mapel?.guru?.nama_guru || 'N/A'}</p>
                                        <p className="text-lg text-center mt-4 font-semibold">{jadwal.jam_masuk || 'N/A'} - {jadwal.jam_keluar || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                {beritas.length > 0 && (
                                    <div className="relative w-full h-[calc(100vh-180px)] max-w-3xl overflow-hidden">
                                        {beritas.map((berita, index) => (
                                            <div
                                                key={berita.id}
                                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMarquee ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                {berita.video_path ? (
                                                    <video
                                                        ref={(el) => (videoRefs.current[index] = el)}
                                                        src={`/storage/${berita.video_path}`}
                                                        className="w-full h-full object-fill rounded-lg"
                                                        autoPlay
                                                        muted
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        src={`/storage/${berita.image_path}`}
                                                        alt={berita.judul}
                                                        className="w-full h-full object-fill rounded-lg"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2 w-72">
                                {rightJadwals.map((jadwal) => (
                                    <div key={jadwal.id} className="bg-yellow-200 p-2 rounded-lg shadow-md">
                                        <p className="text-lg text-center font-bold mb-1">{jadwal.kelas?.nama_kelas || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">{jadwal.mapel?.nama_mapel || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">Guru: {jadwal.mapel?.guru?.nama_guru || 'N/A'}</p>
                                        <p className="text-lg text-center mt-4 font-semibold">{jadwal.jam_masuk || 'N/A'} - {jadwal.jam_keluar || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Add different arrangement for Layout 2 here */}
                        <div className="flex flex-1 p-5 space-x-4">
                            <div className="flex-1 flex flex-col items-center">
                                {beritas.length > 0 && (
                                    <div className="relative w-full h-[calc(100vh-180px)] max-w-3xl overflow-hidden">
                                        {beritas.map((berita, index) => (
                                            <div
                                                key={berita.id}
                                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMarquee ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                {berita.video_path ? (
                                                    <video
                                                        ref={(el) => (videoRefs.current[index] = el)}
                                                        src={`/storage/${berita.video_path}`}
                                                        className="w-full h-full object-fill rounded-lg"
                                                        autoPlay
                                                        muted
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        src={`/storage/${berita.image_path}`}
                                                        alt={berita.judul}
                                                        className="w-full h-full object-fill rounded-lg"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2 w-72">
                                {leftJadwals.map((jadwal) => (
                                    <div key={jadwal.id} className="bg-yellow-200 p-2 rounded-lg shadow-md">
                                        <p className="text-lg text-center font-bold mb-1">{jadwal.kelas?.nama_kelas || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">{jadwal.mapel?.nama_mapel || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">Guru: {jadwal.mapel?.guru?.nama_guru || 'N/A'}</p>
                                        <p className="text-lg text-center mt-4 font-semibold">{jadwal.jam_masuk || 'N/A'} - {jadwal.jam_keluar || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col space-y-2 w-72">
                                {rightJadwals.map((jadwal) => (
                                    <div key={jadwal.id} className="bg-yellow-200 p-2 rounded-lg shadow-md">
                                        <p className="text-lg text-center font-bold mb-1">{jadwal.kelas?.nama_kelas || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">{jadwal.mapel?.nama_mapel || 'N/A'}</p>
                                        <p className="text-base font-semibold bg-orange-400 p-1 text-center rounded-lg mb-1">Guru: {jadwal.mapel?.guru?.nama_guru || 'N/A'}</p>
                                        <p className="text-lg text-center mt-4 font-semibold">{jadwal.jam_masuk || 'N/A'} - {jadwal.jam_keluar || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full py-2 bg-yellow-600 text-black font-black text-center text-xl">
                    <div className="marquee">
                        <div className="marquee-content">
                            {beritas.map((berita, index) => (
                                <span key={index} className="mx-4">
                                    {berita.deskripsi}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </NoLayout>
    );
}
