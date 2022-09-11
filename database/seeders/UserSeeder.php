<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'email' => 'admin@movieapp.com',
            'role' => 1
        ]);

        User::factory()->create([
            'email' => 'user@movieapp.com',
            'role' => 2
        ]);

        User::factory(8)->create();
    }
}
