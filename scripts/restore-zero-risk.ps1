$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$archiveRoot = Join-Path $repoRoot '_archive'

if (-not (Test-Path -LiteralPath $archiveRoot)) {
    Write-Host 'No archive directory found at: ' $archiveRoot
    exit 0
}

Get-ChildItem -LiteralPath $archiveRoot -Recurse -Force | Sort-Object FullName | ForEach-Object {
    $relativePath = $_.FullName.Substring($archiveRoot.Length).TrimStart('\')
    $source = $_.FullName
    $target = Join-Path $repoRoot $relativePath

    $targetParent = Split-Path -Parent $target
    if (-not [string]::IsNullOrEmpty($targetParent)) {
        New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
    }

    if (Test-Path -LiteralPath $target) {
        $newTarget = Join-Path $targetParent ("{0} (restored)" -f [System.IO.Path]::GetFileNameWithoutExtension($target))
        if ([string]::IsNullOrEmpty([System.IO.Path]::GetExtension($target))) {
            $newTarget = Join-Path $targetParent ("{0} (restored)" -f [System.IO.Path]::GetFileName($target))
        }
        $target = $newTarget
    }

    Move-Item -LiteralPath $source -Destination $target -Force
    Write-Host "Restored: $relativePath -> $target"
}

Write-Host 'Restore complete.'
