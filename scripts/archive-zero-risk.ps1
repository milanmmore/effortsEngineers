param(
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

function Get-UniqueArchivePath {
    param(
        [string]$Path
    )

    $candidate = $Path
    $index = 1
    while (Test-Path -LiteralPath $candidate) {
        $directory = [System.IO.Path]::GetDirectoryName($candidate)
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($candidate)
        $extension = [System.IO.Path]::GetExtension($candidate)
        $candidate = Join-Path -Path $directory -ChildPath ("{0} ({1}){2}" -f $fileName, $index, $extension)
        $index++
    }

    return $candidate
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$archiveRoot = Join-Path $repoRoot '_archive'

New-Item -ItemType Directory -Path $archiveRoot -Force | Out-Null

$targets = @(
    'node_modules',
    'effortsengineers-frontend/node_modules',
    'effortsengineers-backend/node_modules',
    '.next',
    'effortsengineers-frontend/.next',
    'out',
    'effortsengineers-frontend/out',
    'package.json',
    'package-lock.json',
    'index.html',
    'index.txt',
    '_sidebar.md',
    'markdown-files.txt',
    '.nojekyll',
    'workspace-tree.txt',
    'project-docs.code-workspace'
)

$moved = @()
$skipped = @()

foreach ($relativePath in $targets) {
    $source = Join-Path $repoRoot $relativePath
    if (-not (Test-Path -LiteralPath $source)) {
        $skipped += $relativePath
        continue
    }

    $destination = Join-Path $archiveRoot $relativePath
    $destinationParent = Split-Path -Parent $destination
    if (-not [string]::IsNullOrEmpty($destinationParent)) {
        New-Item -ItemType Directory -Path $destinationParent -Force | Out-Null
    }

    if (Test-Path -LiteralPath $destination) {
        $destination = Get-UniqueArchivePath -Path $destination
    }

    if ($WhatIf) {
        Write-Host "Would move: $relativePath -> $destination"
        $moved += $relativePath
        continue
    }

    Move-Item -LiteralPath $source -Destination $destination -Force
    $moved += $relativePath
    Write-Host "Archived: $relativePath -> $destination"
}

Write-Host ''
Write-Host 'Summary:'
Write-Host "  Archived: $($moved.Count)"
Write-Host "  Already missing: $($skipped.Count)"

if ($WhatIf) {
    Write-Host 'Dry run complete. No files were moved.'
}
