# Script pour récupérer les véhicules depuis le wiki RageMP
$url = "https://wiki.rage.mp/wiki/Vehicles"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
$content = $response.Content

# Extraire les liens vers les pages de véhicules
$pattern = 'href="/wiki/([^"]*)"'
$matches = [regex]::Matches($content, $pattern)

$vehicles = @()
foreach ($match in $matches) {
    $vehicleName = $match.Groups[1].Value
    if ($vehicleName -notlike "*Vehicles*" -and $vehicleName -notlike "*Category*" -and $vehicleName -notlike "*Template*") {
        $vehicles += $vehicleName
    }
}

# Afficher les premiers véhicules trouvés
$vehicles | Select-Object -First 50 | ForEach-Object { Write-Host $_ } 