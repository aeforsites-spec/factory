# Copies + resizes photos into images/products/<CODE>/1.jpg, 2.jpg ...
# Usage: powershell -ExecutionPolicy Bypass -File tools\import-photos.ps1 -Source "F:\site" -MapFile tools\photo-map.txt
# photo-map.txt format, one product per line:   CODE: 17, 90, 91
# Numbers refer to the photos in Source sorted by file name (1 = first file).
param(
  [Parameter(Mandatory)][string]$Source,
  [string]$MapFile = "",
  [int]$MaxSize = 1600,
  [int]$Quality = 82
)
Add-Type -AssemblyName System.Drawing
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
if (-not $MapFile) { $MapFile = Join-Path $here "photo-map.txt" }
$files = Get-ChildItem $Source -File | Where-Object { $_.Extension -match '^\.(jpe?g|png|webp)$' } | Sort-Object Name
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)

foreach ($line in Get-Content $MapFile -Encoding UTF8) {
  if ($line -notmatch '^\s*([A-Za-z0-9-]+)\s*:\s*(.+)$') { continue }
  # tokens: a number = Nth photo in Source (sorted by name); anything else = file path under Source without extension, e.g. batch2/T35
  $code = $Matches[1]; $nums = $Matches[2] -split '[,\s]+' | Where-Object { $_ }
  $dir = Join-Path $root "images\products\$code"
  if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
  New-Item -ItemType Directory -Force $dir | Out-Null
  $i = 0
  foreach ($n in $nums) {
    $i++
    if ($n -match '^\d+$') { $file = $files[[int]$n - 1] }
    else { $file = Get-Item ((Join-Path $Source ($n -replace '/', '\')) + ".jpeg") }
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    # respect EXIF orientation if present
    if ($img.PropertyIdList -contains 0x0112) {
      switch ([int]$img.GetPropertyItem(0x0112).Value[0]) {
        3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') }
      }
    }
    $sc = [math]::Min(1.0, $MaxSize / [math]::Max($img.Width, $img.Height))
    $rotated = ($img.PropertyIdList -contains 0x0112) -and ([int]$img.GetPropertyItem(0x0112).Value[0] -ne 1)
    if ($sc -eq 1.0 -and -not $rotated -and $file.Extension -match '^\.jpe?g$') {
      # already small enough: copy as-is (no quality loss from re-encoding)
      $img.Dispose(); Copy-Item $file.FullName (Join-Path $dir "$i.jpg"); continue
    }
    $w = [int]($img.Width * $sc); $h = [int]($img.Height * $sc)
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, $w, $h)
    $bmp.Save((Join-Path $dir "$i.jpg"), $codec, $ep)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  }
  "{0,-6} {1} photos" -f $code, $i
}
