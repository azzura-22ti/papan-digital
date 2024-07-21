<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Berita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index()
    {
        $beritas = Berita::all();
        return Inertia::render('Berita/Index', ['beritas' => $beritas]);
    }

    public function create()
    {
        return Inertia::render('Berita/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'video_path' => 'nullable|file|mimes:mp4,avi,mov|max:10240', // Validasi untuk file video
            'image_path' => 'nullable|file|mimes:jpeg,png|max:10240', // Validasi untuk file gambar
        ]);

        $berita = new Berita();
        $berita->judul = $request->judul;
        $berita->deskripsi = $request->deskripsi;

        // Handle video file upload
        if ($request->hasFile('video_path')) {
            $video = $request->file('video_path');
            $videoPath = $video->store('videos', 'public');
            $berita->video_path = $videoPath;
        }

        // Handle image file upload
        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');
            $imagePath = $image->store('images', 'public');
            $berita->image_path = $imagePath;
        }

        $berita->save();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(Berita $berita)
    {
        return Inertia::render('Berita/Edit', ['berita' => $berita]);
    }


    public function update(Request $request, Berita $berita)
    {
        $request->validate([
            'judul' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'video_path' => 'nullable|file|mimes:mp4,avi,mov|max:10240',
            'image_path' => 'nullable|file|mimes:jpeg,png|max:10240',
        ]);

        if ($request->filled('judul')) {
            $berita->judul = $request->judul;
        }

        if ($request->filled('deskripsi')) {
            $berita->deskripsi = $request->deskripsi;
        }


        // Menghapus video atau gambar lama jika ada yang diupload baru
        if ($request->hasFile('video_path')) {
            Storage::delete($berita->video_path);
            $videoPath = $request->file('video_path')->store('public/videos');
            $berita->video_path = str_replace('public/', '', $videoPath);
        }

        if ($request->hasFile('image_path')) {
            Storage::delete($berita->image_path);
            $imagePath = $request->file('image_path')->store('public/images');
            $berita->image_path = str_replace('public/', '', $imagePath);
        }
        $berita->save();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil diubah.');
    }


    public function destroy(Berita $berita)
    {
        // Hapus file video terkait sebelum menghapus record dari database
        if ($berita->video_path) {
            Storage::disk('public')->delete($berita->video_path);
        }

        // Hapus file gambar terkait sebelum menghapus record dari database
        if ($berita->image_path) {
            Storage::disk('public')->delete($berita->image_path);
        }

        $berita->delete();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil dihapus.');
    }
}
