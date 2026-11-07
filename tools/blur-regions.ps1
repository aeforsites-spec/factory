# Pixelates rectangles in site photos (to hide text such as phone numbers).
# Usage: powershell -ExecutionPolicy Bypass -File tools\blur-regions.ps1
# Each line in tools\blur-regions.txt:   images/products/CT-03/1.jpg: x1 y1 x2 y2 ; x1 y1 x2 y2
# Coordinates are percentages of the image width/height (0-100).
param([string]$Only = "")   # optional: process only lines whose image path contains this text
Add-Type -AssemblyName System.Drawing
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]88)

foreach ($line in Get-Content (Join-Path $here "blur-regions.txt") -Encoding UTF8) {
  if ($line -notmatch '^\s*([^#:][^:]*):\s*(.+)$') { continue }
  if ($Only -and $Matches[1] -notlike "*$Only*") { continue }
  $path = Join-Path $root $Matches[1].Trim()
  $rects = $Matches[2] -split ';'
  $src = [System.Drawing.Image]::FromFile($path)
  $bmp = New-Object System.Drawing.Bitmap $src
  $src.Dispose()
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  foreach ($r in $rects) {
    $v = $r.Trim() -split '\s+' | ForEach-Object { [double]$_ }
    $x = [int]($bmp.Width * $v[0] / 100); $y = [int]($bmp.Height * $v[1] / 100)
    $w = [int]($bmp.Width * ($v[2] - $v[0]) / 100); $h = [int]($bmp.Height * ($v[3] - $v[1]) / 100)
    $block = [math]::Max(10, [int]($h / 2))
    $sw = [math]::Max(1, [int]($w / $block)); $sh = [math]::Max(1, [int]($h / $block))
    $small = New-Object System.Drawing.Bitmap $sw, $sh
    $gs = [System.Drawing.Graphics]::FromImage($small); $gs.InterpolationMode = 'HighQualityBilinear'
    $gs.DrawImage($bmp, (New-Object System.Drawing.Rectangle 0, 0, $sw, $sh), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), 'Pixel'); $gs.Dispose()
    $g.InterpolationMode = 'NearestNeighbor'; $g.PixelOffsetMode = 'Half'
    $g.DrawImage($small, (New-Object System.Drawing.Rectangle $x, $y, $w, $h), (New-Object System.Drawing.Rectangle 0, 0, $sw, $sh), 'Pixel')
    $small.Dispose()
  }
  $g.Dispose()
  $bmp.Save($path, $codec, $ep); $bmp.Dispose()
  "blurred {0} ({1} area(s))" -f $Matches[1].Trim(), $rects.Count
}
