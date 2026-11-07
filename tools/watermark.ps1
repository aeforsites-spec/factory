# Stamps every product photo with the company name + WhatsApp number.
# A faint diagonal line across the middle (hard to crop out) and a solid badge in the corner.
# Run only on fresh copies (build-photos.ps1 does import -> blur -> watermark), never twice on the same file.
param(
  [string]$Name   = "المؤسسة الفنية لتصنيع مكنات الطوب الاسمنتي",
  [string]$Phone  = "01020204027",
  [string]$Only   = ""
)
Add-Type -AssemblyName System.Drawing
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]86)

$rtl = New-Object System.Drawing.StringFormat
$rtl.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft
$rtl.Alignment = [System.Drawing.StringAlignment]::Center
$rtl.LineAlignment = [System.Drawing.StringAlignment]::Center
$ltr = New-Object System.Drawing.StringFormat
$ltr.Alignment = [System.Drawing.StringAlignment]::Center
$ltr.LineAlignment = [System.Drawing.StringAlignment]::Center

$n = 0
foreach ($file in Get-ChildItem (Join-Path $root "images\products") -Recurse -Filter *.jpg) {
  if ($Only -and $file.FullName -notlike "*$Only*") { continue }
  $src = [System.Drawing.Image]::FromFile($file.FullName)
  $bmp = New-Object System.Drawing.Bitmap $src
  $src.Dispose()
  $W = $bmp.Width; $H = $bmp.Height; $short = [math]::Min($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAlias'

  # 1) diagonal centre mark
  $diag = [math]::Sqrt($W * $W + $H * $H)
  $f1 = New-Object System.Drawing.Font("Tahoma", [float]($diag / 34), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $f2 = New-Object System.Drawing.Font("Arial", [float]($diag / 26), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $state = $g.Save()
  $g.TranslateTransform($W / 2, $H / 2)
  $g.RotateTransform([float](-[math]::Atan2($H, $W) * 180 / [math]::PI * 0.75))
  $box1 = New-Object System.Drawing.RectangleF (-$diag / 2), (-$f1.Height * 1.1), $diag, ($f1.Height * 1.2)
  $box2 = New-Object System.Drawing.RectangleF (-$diag / 2), (0), $diag, ($f2.Height * 1.2)
  $shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 0, 0, 0))
  $light  = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(85, 255, 255, 255))
  $o = [float]([math]::Max(1.5, $diag / 900))
  foreach ($pair in @(@($box1, $f1, $Name, $rtl), @($box2, $f2, "WhatsApp $Phone", $ltr))) {
    $r = $pair[0]; $sh = New-Object System.Drawing.RectangleF ($r.X + $o), ($r.Y + $o), $r.Width, $r.Height
    $g.DrawString($pair[2], $pair[1], $shadow, $sh, $pair[3])
    $g.DrawString($pair[2], $pair[1], $light, $r, $pair[3])
  }
  $g.Restore($state)

  # 2) corner badge (bottom-left; product code badges sit at the top)
  $fb = New-Object System.Drawing.Font("Tahoma", [float]($short / 30), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fp = New-Object System.Drawing.Font("Arial", [float]($short / 24), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $s1 = $g.MeasureString($Name, $fb, 4000, $rtl); $s2 = $g.MeasureString("WhatsApp $Phone", $fp)
  $pad = $short / 60
  $bw = [math]::Max($s1.Width, $s2.Width) + 2 * $pad; $bh = $s1.Height + $s2.Height + 1.5 * $pad
  $bx = $pad; $by = $H - $bh - $pad
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(165, 20, 28, 38))), [float]$bx, [float]$by, [float]$bw, [float]$bh)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 245, 158, 11))), [float]$bx, [float]$by, [float]($pad / 2), [float]$bh)
  $g.DrawString($Name, $fb, [System.Drawing.Brushes]::White, (New-Object System.Drawing.RectangleF $bx, ($by + $pad / 2), $bw, $s1.Height), $rtl)
  $g.DrawString("WhatsApp $Phone", $fp, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 37, 211, 102))), (New-Object System.Drawing.RectangleF $bx, ($by + $pad / 2 + $s1.Height), $bw, $s2.Height), $ltr)

  $g.Dispose()
  $bmp.Save($file.FullName, $codec, $ep); $bmp.Dispose()
  $n++
}
"watermarked $n photos"
