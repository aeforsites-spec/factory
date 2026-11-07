# Rebuilds all product photos from the originals:  import -> blur private numbers -> watermark
# Usage: powershell -ExecutionPolicy Bypass -File tools\build-photos.ps1 -Source "F:\site"
param([Parameter(Mandatory)][string]$Source)
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& (Join-Path $here "import-photos.ps1") -Source $Source | Out-Null
"imported"
& (Join-Path $here "blur-regions.ps1") | Measure-Object | ForEach-Object { "blurred $($_.Count) photos" }
& (Join-Path $here "watermark.ps1")
