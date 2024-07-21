<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MapelController extends Controller
{
    public function index()
    {
        $mapels = Mapel::with('guru')->get();
        return Inertia::render('Mapel/Index', ['mapels' => $mapels]);
    }

    public function create()
    {
        $gurus = Guru::all();
        return Inertia::render('Mapel/Create', ['gurus' => $gurus]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mapel' => 'required|string|max:255',
            'guru_id' => 'required|exists:gurus,id',
        ]);

        $mapel = new Mapel();
        $mapel->nama_mapel = $request->nama_mapel;
        $mapel->guru_id = $request->guru_id;

        $mapel->save();

        return redirect()->route('mapel.index')->with('success', 'Data mata pelajaran berhasil ditambahkan.');
    }


    public function edit(Mapel $mapel)
    {
        $gurus = Guru::all();
        return Inertia::render('Mapel/Edit', ['mapel' => $mapel, 'gurus' => $gurus]);
    }

    public function update(Request $request, Mapel $mapel)
    {
        $request->validate([
            'nama_mapel' => 'required|string|max:255',
            'guru_id' => 'required|exists:gurus,id',
        ]);

        // Update data mapel
        $mapel->nama_mapel = $request->nama_mapel;
        $mapel->guru_id = $request->guru_id;

        $mapel->save();

        return redirect()->route('mapel.index')->with('success', 'Data mata pelajaran berhasil diubah.');
    }

    public function destroy(Mapel $mapel)
    {

        $mapel->delete();

        return redirect()->route('mapel.index')->with('success', 'Data mapel berhasil dihapus.');
    }
}
