<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Jadwal;
use App\Models\Kelas;
use App\Models\Mapel;

class JadwalController extends Controller
{
    public function index()
    {
        $jadwals = Jadwal::with('kelas', 'mapel')->get();
        return Inertia::render('Jadwal/Index', ['jadwals' => $jadwals]);
    }

    public function create()
    {
        $kelas = Kelas::all();
        $mapels = Mapel::all();
        return Inertia::render('Jadwal/Create', ['kelas' => $kelas, 'mapels' => $mapels]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'mapel_id' => 'required|exists:mapels,id',
            'jam_masuk' => 'required|date_format:H:i',
            'jam_keluar' => 'required|date_format:H:i|after:jam_masuk',
        ]);

        Jadwal::create($request->all());

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function edit(Jadwal $jadwal)
    {
        $kelas = Kelas::all();
        $mapels = Mapel::all();
        return Inertia::render('Jadwal/Edit', ['jadwal' => $jadwal, 'kelas' => $kelas, 'mapels' => $mapels]);
    }

    public function update(Request $request, Jadwal $jadwal)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'mapel_id' => 'required|exists:mapels,id',
            'jam_masuk' => 'required|date_format:H:i',
            'jam_keluar' => 'required|date_format:H:i|after:jam_masuk',
        ]);

        $jadwal->update($request->all());

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diubah.');
    }

    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();

        return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil dihapus.');
    }
}
