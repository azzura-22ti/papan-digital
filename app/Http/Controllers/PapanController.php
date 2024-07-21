<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PapanController extends Controller
{
    public function index()
    {
        $jadwals = Jadwal::with('kelas', 'mapel.guru')->get();
        $beritas = Berita::all();

        return Inertia::render('Papan/Index', [
            'jadwals' => $jadwals,
            'beritas' => $beritas,
        ]);
    }
}
