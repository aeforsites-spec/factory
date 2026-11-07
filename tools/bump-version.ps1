# Stamps a new version on the CSS/JS links in every page, so visitors' browsers
# download the updated files right away instead of showing a cached old copy.
# Run before every upload:  powershell -ExecutionPolicy Bypass -File tools\bump-version.ps1
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
$v = Get-Date -Format "yyyyMMddHHmm"
$utf8 = New-Object System.Text.UTF8Encoding($false)
foreach ($page in Get-ChildItem $root -Filter *.html) {
  $s = [IO.File]::ReadAllText($page.FullName)
  $s = [regex]::Replace($s, '((?:href|src)="(?:css|js|data)/[^"?]+\.(?:css|js))(?:\?v=[^"]*)?"', ('$1?v=' + $v + '"'))
  [IO.File]::WriteAllText($page.FullName, $s, $utf8)
}
"version $v"
