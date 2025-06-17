<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function getAll(): Response
    {
        return Inertia::render('Project/Projects', []);
    }
}
