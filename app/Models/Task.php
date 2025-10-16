<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    protected $fillable = [
        'title',
        'user_id', 
        'description', 
        'status', 
        'due_date'
    ];
    use SoftDeletes;
    public function user(){
        return $this->belongsTo(User::class);
    }
}
