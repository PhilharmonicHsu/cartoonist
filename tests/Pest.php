<?php

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(TestCase::class)->in('Feature', 'Unit', 'Service');
uses(RefreshDatabase::class)->in('Feature');
